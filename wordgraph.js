
$(function(){
  
  // get exported json from cytoscape desktop via ajax
  var graphP = $.ajax({
    url: 'https://rawgit.com/JohnPeng47/Word2Vec-Graph-Visualization/master/graph_data.json', // tokyo-railways.json
    type : 'GET',
    dataType : 'json',
    async: true,
    error: function(err){
        console.log(err)
        console.log("fucked up")
    },
    success : function(data){
        var temp_elements = {}
        temp_elements = data.elements        
        console.log(temp_elements)
        //create array of positions
        var cy = cytoscape({
            container: document.getElementById("cy"),
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'color': '#ffffff',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge[cluster=0]',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'core',
                    style:  {
                        "active-bg-color": "#ffffb3",
                        "active-bg-opacity":" 0.333"
                    }
                }
            ],
            elements: data.elements,
            layout: {
                name: "preset",
                fit: true
            }
        })
        var nodes = cy.nodes()
        addEdges(cy)    
    }
  });
})
function findCentroid(nodes){
    if (nodes.length == 0){
        return "srrymate"
    }
    var x = 0
    var y = 0
    for(var i=0; i < nodes.length; i++){
        x += nodes[i].position("x")
        y += nodes[i].position("y")
    }
    console.log("centre x: "+x)
    console.log("centre y: "+y)
    console.log("size: "+nodes.length)

    return [x/nodes.length, y/nodes.length]
}
function addEdges(cy){
    var nodes = cy.nodes()
    var cluster_num = 15;
    // for(var i = 0;i < nodes.length; i++){
    //     console.log(nodes[i].data("cluster"))
    // }
    for(var i=0;i < cluster_num; i++){
        var currentCluster = []
        for (var j=0; j < nodes.length; j++){
            console.log(nodes[j].data("cluster"))
            if (nodes[j].data("cluster") == i){ currentCluster.push(nodes[j]) }
        }
        // if current cluster not empty
        if(currentCluster){
            //find the centroid node in the cluster
            console.log("hello")
            var centre = findCentroid(currentCluster)
            if(centre=="srrymate"){
                continue
            }
            //find the centre node aka closest to the centroid coordinate; 
            //currentCluster assumed to be non empty
            var distance = Number.MAX_SAFE_INTEGER
            var centreNode = currentCluster[0]
            for (var ind = 0; ind < currentCluster.length; ind++){
                var currentNode = currentCluster[ind]
                var x_position = currentNode.position("x")
                var y_position = currentNode.position("y")
                //distance from currentNode to centroid
                var temp_distance = Math.sqrt(Math.pow(x_position-centre[0],2)+Math.pow(y_position-centre[1],2))
                console.log(temp_distance)
                if (temp_distance < distance){
                    distance = temp_distance
                    centreNode = currentNode
                } 
            }
            for (var m = 0; m < currentCluster.length; m++){
                if (currentCluster[m].id() == centreNode.id()){
                    continue
                }
                cy.add({
                    group: "edges",
                    data:{
                        source: centreNode.id(),
                        target: currentCluster[m].id(),
                        cluster: i, //assign edge to current cluster number
                        is_walking: true
                    }
                })
                var newStyle = currentCluster[m].style()
                newStyle["background-color"] = "#ffb3b3"
            }
            //assign colours
            // for (var i = 0;i < cluster_num; i++){
            //     var index = "node[cluster="+i.toString()+"]"
            //     console.log(index)
            //     var nodes = cy.elements["node[cluster="+i.toString()+"]"]
            //     console.log(nodes)
            //     if(typeof nodes != "undefined"){
            //         for(var j=0; j < nodes.length; j++){
            //             var newStyle = nodes[j].style()
            //             newStyle["background-color"] = "#ffb3b3"

            //         }
            //     }                                  
            // }
        }
    }
    // console.log(cy.edges())
}
 