PopmapVis = function(_parentElement, _data,_eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
	this.eventHandler = _eventHandler;

var map = d3.geomap.choropleth()
    .geofile('countries/USA.json')
	//.geofile('/js/us-10m.json')
    .projection(d3.geo.albersUsa)
    .column('rate')
    .unitId('FIPS2')
    .scale(1000)
    .legend(true);


    d3.select('#popmapVis')
        .datum(this.data)
        .call(map.draw, map);

}