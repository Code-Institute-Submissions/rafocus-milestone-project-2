queue()
    .defer(d3.json, "data/films.json")
    .await(makeGraph);


function makeGraph(error, data) {

    let ndx = crossfilter(data);

    //  define dimensions
    genreDimension = ndx.dimension(d=> d.genre)
    // define groups
    genreGroup = genreDimension.group()
    // charts

    let piechart1 = dc.pieChart("#chart")
                    .width(400)
                    .height(300)
                    .dimension(genreDimension)
                    .group(genreGroup)
    

    dc.renderAll();
}


