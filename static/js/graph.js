queue()
    .defer(d3.json, "data/films.json")
    .await(makeGraph);

function makeGraph(error, data) {

    //  create crossfilter instance using the json data
    var ndx = crossfilter(data);

    // charts
    show_movie_rank(ndx)
    show_movie_genre(ndx)
    show_movie_oscars(ndx)
    show_gross_nominations(ndx)
    show_genre_oscars(ndx)
    show_year_gross(ndx)
    show_datatable(ndx)

    dc.renderAll();
}

function show_movie_rank(ndx) {
    // pass in the info to be ued in grouping and lebeling
    var bubbleDimension = ndx.dimension(d => [d.rank, d.nominations, d.name])
    var bubbleGroup = bubbleDimension.group().reduceSum(d => d.oscars)

    dc.bubbleChart("#movie-rank")
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
        .yAxisLabel("Rank")
        .xAxisLabel("Nominations")
}

function show_movie_genre(ndx) {
    var genreDimension = ndx.dimension(d => d.genre)
    var genreGroup = genreDimension.group()

    dc.pieChart("#movie-genre")
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
}

function show_movie_oscars(ndx) {
    var oscarsDimension = ndx.dimension(d => d.oscars)
    var oscarsGroup = oscarsDimension.group()

    dc.pieChart("#movie-oscars")
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
}

function show_gross_nominations(ndx) {
    var grossDimension = ndx.dimension(d => Math.floor(d.gross / 50) * 50) // treat gross profits in levels of size 50
    var grossGroup = grossDimension.group().reduceSum(d => d.nominations)

    dc.barChart("#gross-nominations")
        .width(400)
        .height(300)
        .dimension(grossDimension)
        .group(grossGroup)
        .x(d3.scale.linear().domain([0, 660]))
        .xUnits(dc.units.fp.precision(50))
        .yAxisLabel("Gross")
        .xAxisLabel("Total Nominations")
        .yAxis().ticks(5)
        

}

function show_genre_oscars(ndx) {
    var genreDimension = ndx.dimension(d => d.genre)
    var genreGroup = genreDimension.group().reduceSum(d=> d.oscars)

    dc.barChart("#genre-oscars")
        .width(600)
        .height(300)
        .dimension(genreDimension)
        .group(genreGroup)
        .x(d3.scale.ordinal().domain([]))
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Number of Oscars")
        .yAxis().ticks(5)
}

function show_year_gross(ndx) {
    var dateDimension = ndx.dimension(d => d.date)
    var dateGroup = dateDimension.group().reduceSum(d => d.gross)

    dc.barChart("#year-gross")
        .width(600)
        .height(300)
        .dimension(dateDimension)
        .group(dateGroup)
        .x(d3.scale.ordinal().domain([]))
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Gross")
        .xAxis().ticks(10)
}

function show_datatable(ndx) {
    var rankDimension = ndx.dimension(d => d.rank)

    dc.dataTable("#table")
        .width(800)
        .height(200)
        .dimension(rankDimension)
        .group(d => d)
        .showGroups(false)
        .size(10)
        .columns(['rank',
            'name',
            'date',
            'oscars',
            'nominations',
            'gross',
            'genre'
        ])
}


