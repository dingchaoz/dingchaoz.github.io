var map = d3.geomap.choropleth()
    .geofile('countries/USA.json')
    .projection(d3.geo.albersUsa)
    .column('White')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('/data/race2013.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});
