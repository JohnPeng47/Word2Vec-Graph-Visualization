
$(function(){
  
  // get exported json from cytoscape desktop via ajax
  var graphP = $.ajax({
    url: 'https://cdn.rawgit.com/JohnPeng47/Word2Vec-Graph-Visualization/98d1da37/graph_data.json', // tokyo-railways.json
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
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=0]',
                    style: {
                        'width': 3,
                        'line-color': '#ff3300',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
                {
                    selector: 'edge[cluster=1]',
                    style: {
                        'width': 3,
                        'line-color': '#0080ff',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
                {
                    selector: 'edge[cluster=2]',
                    style: {
                        'width': 3,
                        'line-color': '#ff0080',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
                {
                    selector: 'edge[cluster=3]',
                    style: {
                        'width': 3,
                        'line-color': '#59b300',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
        
                {
                    selector: 'edge[cluster=4]',
                    style: {
                        'width': 3,
                        'line-color': '#0099cc',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
                {
                    selector: 'edge[cluster=5]',
                    style: {
                        'width': 3,
                        'line-color': '#993300',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                }, 
                {
                    selector: 'edge[cluster=6]',
                    style: {
                        'width': 3,
                        'line-color': '#6666cc',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=7]',
                    style: {
                        'width': 3,
                        'line-color': '#ff00ff',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=8]',
                    style: {
                        'width': 3,
                        'line-color': '#002699',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=9]',
                    style: {
                        'width': 3,
                        'line-color': '#ff9999',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=10]',
                    style: {
                        'width': 3,
                        'line-color': '#70db70',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=11]',
                    style: {
                        'width': 3,
                        'line-color': '#0f3d0f',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=12]',
                    style: {
                        'width': 3,
                        'line-color': '#e60000',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'edge[cluster=13]',
                    style: {
                        'width': 3,
                        'line-color': '#5900b3',
                        'target-arrow-color': '#ff3300',
                        'target-arrow-shape': 'triangle'
                    }
                },                
                {
                    selector: 'edge[cluster=14]',
                    style: {
                        'width': 3,
                        'line-color': '#b3b300',
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
        //add differen colours for each cluster
        var tickets = ['#ff3300','#0080ff','#ff0080','#59b300','#0099cc','#993300','#6666cc']
        var stylesheet = cy.style().json()
        stylesheet.push({
            selector: "edge[cluster=0]",
            style: {
                'width': 3,
                'line-color': '#6666cc',
                'target-arrow-color': '#ff3300',
                'target-arrow-shape': 'triangle'
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
    return [x/nodes.length, y/nodes.length]
}
function addEdges(cy){
    var nodes = cy.nodes()
    var cluster_num = 15;
    for(var i=0;i < cluster_num; i++){
        var currentCluster = []
        for (var j=0; j < nodes.length; j++){
            // console.log(nodes[j].data("cluster"))
            if (nodes[j].data("cluster") == i){ currentCluster.push(nodes[j]) }
        }
        // if current cluster not empty
        if(currentCluster){
            //find the centroid node in the cluster
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
                if (temp_distance < distance){
                    distance = temp_distance
                    centreNode = currentNode
                } 
            }
            for (var m = 0; m < currentCluster.length; m++){
                if (currentCluster[m].id() == centreNode.id()){
                    continue
                }
                console.log("cluster"+i)
                cy.add({
                    group: "edges",
                    data:{
                        source: centreNode.id(),
                        target: currentCluster[m].id(),
                        cluster: i, //assign edge to current cluster number
                        is_walking: true
                    }
                })
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
 