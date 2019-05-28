queue()
    .defer(d3.json, "data/films.json")
    .await(makeGraph);


function makeGraph(error, data) {

    let ndx = crossfilter(data);

    //  define dimensions
    genreDimension = ndx.dimension(d => d.genre)
    oscarsDimension = ndx.dimension(d => d.oscars)
    bubbleDimension = ndx.dimension(d => [d.rank, d.nominations, d.name])

    // define groups
    genreGroup = genreDimension.group()
    oscarsGroup = oscarsDimension.group()
    bubbleGroup = bubbleDimension.group().reduceSum(d => d.oscars)

    // charts
    let piechart1 = dc.pieChart("#piechart1")
                    .width(400)
                    .height(300)
                    .dimension(genreDimension)
                    .group(genreGroup)
                    .radius(100)
                    .innerRadius(80)
                    .renderLabel(false)
                    .colors(d3.scale.category10())
                    .transitionDuration(1500)
                    .legend(dc.legend().x(320).y(50).itemHeight(12).gap(5))

    let piechart2 = dc.pieChart("#piechart2")
                    .width(400)
                    .height(300)
                    .dimension(oscarsDimension)
                    .group(oscarsGroup)
                    .radius(100)
                    .innerRadius(80)
                    .renderLabel(false)
                    .colors(d3.scale.category10())
                    .transitionDuration(1500)
                    .legend(dc.legend().x(320).y(50).itemHeight(12).gap(5))

    let bubblechart = dc.bubbleChart("#bubblechart")
                    .width(550)
                    .height(900)
                    .margins({ top: 30, bottom: 50, right: 50, left: 50 })
                    .dimension(bubbleDimension)
                    .group(bubbleGroup)
                    .sortBubbleSize(true)
                    .clipPadding(50)
                    .colors(d3.scale.category10())
                    .keyAccessor(d => d.key[1])
                    .valueAccessor(d => d.key[0])
                    .radiusValueAccessor(d => d.value)
                    .label(d => `${d.key[2]}`)
                    .title(d => `${d.key[0]}: ${d.key[2]} / Oscars: ${d.value} / Nominations: ${d.key[1]}`)
                    .maxBubbleRelativeSize(0.08)
                    .r(d3.scale.linear().domain([0, 11]).range([1, 12]))
                    .y(d3.scale.linear().domain([1, 50]).range([1, 50]))
                    .x(d3.scale.linear().domain([0, 14]).range([1, 15]))
                    bubblechart.xAxis().ticks(5)
                    bubblechart.yAxis().ticks(5)


    dc.renderAll();
}


