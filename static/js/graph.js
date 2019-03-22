queue()
    .defer(d3.json, "data/movies.json")
    .await(graph);


function makeGraph(error, moviesData) {

    let ndx = crossfilter(moviesData);

    //  define dimensions
    dateDim = ndx.dimension(function(d) { return year;});
    genreDim = ndx.dimension(function(d) { return genre;});
    directorDim = ndx.dimension(function(d) { return director;});

    dc.renderAll();
}


