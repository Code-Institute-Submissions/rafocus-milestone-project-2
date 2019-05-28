queue()
    .defer(d3.json, "data/films.json")
    .await(makeGraph);


function makeGraph(error, data) {

    let ndx = crossfilter(data);

    //  define dimensions
    genreDimension = ndx.dimension(d=> d.genre)
    oscarsDimension = ndx.dimension(d=> d.oscars)
    // define groups
    genreGroup = genreDimension.group()
    oscarsGroup = oscarsDimension.group()
    // charts

    let piechart1 = dc.pieChart("#piechart1")
                    .width(400)
                    .height(300)
                    .dimension(genreDimension)
                    .group(genreGroup)

    let piechart2 = dc.pieChart("#piechart2")
                    .width(400)
                    .height(300)
                    .dimension(genreDimension)
                    .group(genreGroup)
    

    dc.renderAll();
}


