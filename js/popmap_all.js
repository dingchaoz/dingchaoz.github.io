PopmapallVis = function(_parentElement, _data,_us,_eventHandler){
    this.parentElement = _parentElement;
    //this.data = _data;
	//this.us = _us;
	this.eventHandler = _eventHandler;


// template http://bl.ocks.org/mbostock/4060606

var width = 960,
    height = 600;
	
// rateById has the id, rate data from csv file
var rateById = d3.map();


//Define default colorbrewer scheme
var colorSchemeSelect = "Oranges";
var colorScheme = colorbrewer[colorSchemeSelect]; 

//define default number of quantiles
var quantiles = 5;

var quantize = d3.scale.quantize()
    //.domain([3, 55])
	// template	http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
	// can set to Oranges, Greens Blues or any other color, and category to 3-8, details seen lib/colorbrewer.js
	.range(colorScheme[quantiles]);


var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);
	//.legend(true);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#popmapallVis").append("svg")
    .attr("width", width)
    .attr("height", height);

// reserverd for filter data	
var seldata = [];

//queue()
    //.defer(d3.json, "/js/us-10m.json")
    //.defer(d3.csv, "/data/est08ALL.csv", function(d) { rateById.set(d.id, +d.rate); })
	//.defer(d3.csv, "/data/est08ALL.csv")
    //.await(ready);
	
// test to load data other than use rateById
	


// Filter data according to user selection, need to have 4 dropdown menus for
// age group, year group, race group, gender group
// select age 0, year 1, whitetotal all state data--all age group data
// select age 1, year 1 all state data-- certain age group data
// select age 0, year 1, hispanic male -- certain race group data
// age group and year group is for filter
// each id, one record
// race or gender is select


// filter by year and age group first to get one record per county
function flt(value) {

  return value.YEAR == 1 && value.AGEGRP == 0;


}

var flter = _data.filter(flt);


// now select only columns id and total population and push them into seldata

flter.forEach(function (d) {
					 
                               seldata.push ({
                                    id: d.id ,
									//parse in the poverty rate as number
                                    rate: Number(d.WA_FEMALE) 
                                });
     
                          })
						  
// Set the quantize domain range by getting min and max value of seldata
 quantize.domain([
         d3.min(seldata, function (d) {
           return Number(d.rate)
         }),
         d3.max(seldata, function (d) {
           return Number(d.rate)
         })
   ]);	
   
   
   
   debugger;
   

//d3.map(_data,function(d) { rateById.set(d.id, +d.rate); });
d3.map(seldata,function(d) { rateById.set(d.id, +d.rate); });

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(_us, _us.objects.counties).features)
    .enter().append("path")
      .attr("fill", function(d) { return quantize(rateById.get(d.id)); })
      .attr("d", path);
	  //.attr("data-legend",function(d) { return quantize(rateById.get(d.id));});


  // need to fix the path error	  
  //svg.append("path")
      //.datum(topojson.mesh(_us, _us.objects.states, function(a, b) { return a !== b; }))
      //.attr("class", "states")
      //.attr("d", path);
	  
	  
  var legend = svg.selectAll('g.legendEntry')
    .data(quantize.range())
    .enter()
    .append('g').attr('class', 'legendEntry');

legend
    .append('rect')
    .attr("x", width - 120)
    .attr("y", function(d, i) {
       return i * 20 + 401.5;
    })
   .attr("width", 10)
   .attr("height", 10)
   .style("stroke", "black")
   .style("stroke-width", 1)
   .style("fill", function(d){return d;}); 
       //the data objects are the fill colors

legend
    .append('text')
    .attr("x", width - 105) //leave 5 pixel space after the <rect>
    .attr("y", function(d, i) {
       return i * 20 + 400;
    })
    .attr("dy", "0.8em") //place text one line *below* the x,y point
    .text(function(d,i) {
        var extent = quantize.invertExtent(d);
        //extent will be a two-element array, format it however you want:
        var format = d3.format("0.2f");
        return format(+(extent[0]*100)) + " - " + format(+(extent[1]*100)) + " % ";
    });
    
// legend us referred from http://bl.ocks.org/ZJONSSON/3918369
	//legend = svg.append("g")
    //.attr("class","legend")
    //.attr("transform","translate(900,300)")
    //.style("font-size","12px")
    //.call(d3.legend)
	
	
   //setTimeout(function() { 
    //legend
      //.style("font-size","20px")
      //.attr("data-style-padding",10)
      //.call(d3.legend)
  //},1000)	  



d3.select(self.frameElement).style("height", height + "px");
}