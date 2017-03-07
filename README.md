# Word2Vec-Graph-Visualization
Visualizing Word2Vec trained on Business Insider articles displayed using CytoscapeJs

Used some articles scraped off of Business Insider to generate a Word2Vec representation, using the Gensim implementation of the algorithm.
Once vectors have been generated, used Self Organizing Map (MiniSom implementation) to map the n-dimensional word vectors into 2-D space. Ran 
Kmeans clustering on the 2-D dimensional word vectors, and then graphed using CytospcapeJs to connect all nodes in a cluster to the centre node.


