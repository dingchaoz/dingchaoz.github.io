PopmapallVis = function(_parentElement, _data,_us,_eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
	this.us = _us;
	//this.year = _year;
	this.eventHandler = _eventHandler;

    this.initVis();
}

PopmapallVis.prototype.initVis = function() {

var that = this;
// template http://bl.ocks.org/mbostock/4060606

//function initVis (data,us,year) {

//_data = data;
//_us = us,
//_year = year;


var width = 860;
var height = 420;


//Define default colorbrewer scheme
//var colorSchemeSelect = "Oranges";
//var colorScheme = colorbrewer[colorSchemeSelect]; 

//define default number of quantiles
//var quantiles = 5;

//this.quantize = d3.scale.quantize()
    //.domain([3, 55])
	// template	http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
	// can set to Oranges, Greens Blues or any other color, and category to 3-8, details seen lib/colorbrewer.js
	//.range(colorScheme[quantiles]);


projection = d3.geo.albersUsa()
    .scale(900)
    .translate([width / 2, height / 2]);
	//.legend(true);

this.path = d3.geo.path()
    .projection(projection);

this.svg = d3.select("#popmapallVis").append("svg")
    .attr("width", width)
    .attr("height", height);
	
this.brush = d3.svg.brush()
      .on("brush", function(){
        $(that.eventHandler).trigger("selectionChanged", that.brush.extent());
		console.log(that.brush.extent());
      });
	
this.width = width;
this.height = height;
	
this.wrangleData(null);

this.updateVis();

}

// Get inputs from menu and call wrangle data, update vis
PopmapallVis.prototype.change = function(_input) {


this.year = _input.year;
console.log(_input);
this.race = _input.race;
this.gender = _input.gender;
this.age = _input.age;
if(this.race != null && this.gender !=null && this.gender != "" && this.race != "" || this.year != null || this.age != null && this.age != "")
//if (this.race == null)
{
  this.wrangleData(null);
  this.updateVis();
}

}


PopmapallVis.prototype.wrangleData = function() {


_data = this.data;
_year = this.year;
_race = this.race;
_gender = this.gender;
_age = this.age;


// reserverd for filter data	
var seldata = [];

// selected race and gender group;
// var rg = stringcombine(_race+"_"+"FEMALE");


// rateById has the id, rate data from csv file
rateById = d3.map();



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
  if(_year != null && _age != null) {
  //return value.YEAR == Number(_year) && value.AGEGRP == 0;
  return value.YEAR == Number(_year) && value.AGEGRP == Number(_age);
  }
  else if (_year != null && _age == null) { 
  return value.YEAR == Number(_year) && value.AGEGRP == 0;
  }
  else if (_year == null && _age != null) { 
  return value.YEAR == 1 && value.AGEGRP == Number(_age);
  }
  else
  {
  
   return value.YEAR == 1 && value.AGEGRP == 0;
   }

}

var flter = _data.filter(flt);


// now select only columns id and total population and push them into seldata

flter.forEach(function (d) {
					           if(_race != null && _gender != null){
							      
								  // sum of % of all combinations of race and gender
								  //var sum;
								  
								  // index
								  var a = [];
								  
								  // loop through all combinations of race and gender
                                  for (i = 0; i< _race.length; i++){
								      for (j = 0; j< _gender.length; j++) {
									     a.push(_race[i].concat("_",_gender[j]))
									  }						  
								  }
                                 
								 // sum of % of all combinations of race and gender
								 var sum = 0;
                                 for(var i = 0; i < a.length; i++)
                                {
															   
                                   sum = sum + Number(d[a[i]]);
                                }
								
								// if two genders are selected
								if(_gender.length == 2) {
								   
								   // divide by 2
								   sum = sum/2;
								}
								
								// if Hispanic race is selected
								if(_race.indexOf("H")) {
								   
								   // divide by 2
								   sum = sum * 0.88;
								}
								
							     //a = _race[0].concat("_",_gender[0]);
								  
							      seldata.push ({
                                    id: d.id ,
									 //rate: Number(d[a])
									 rate: sum,
									 stateid: d.STATE,
									 countyid: d.COUNTY,
									 stname:d.STNAME,
									 ctyname:d.CTYNAME
							                   })
                                }											   
							   else {
							   
							      seldata.push ({
                                    id: d.id ,
									rate: Number(d.WA_FEMALE),
									stateid: d.STATE,
									countyid: d.COUNTY,
									stname:d.STNAME,
									ctyname:d.CTYNAME
							      
							                    })								
                                    //rate: Number(d.rg[0])	+ Number(d.rg[1]) + ...	
                                    //a = _input.race[0].concat("_",input.gender[0])	
                                    //d[a] should do the trick									
                                }
     
                          })
						  


var colorSchemeSelect;						  
//Define default colorbrewer scheme
if (_race == null) {
   colorSchemeSelect = "GnBu";
}
else if (_race == "WA"){
   colorSchemeSelect = "GnBu";
}
else if (_race == "BA"){
   colorSchemeSelect = "Greens";
}
else if (_race == "IA"){
   colorSchemeSelect = "Reds";
}
else if (_race == "H"){
   colorSchemeSelect = "Oranges";
}
else if (_race == "AA"){
   colorSchemeSelect = "RdPu";
}
else {

   colorSchemeSelect = "Dark2";

}
 



//var colorSchemeSelect = "Oranges";
var colorScheme = colorbrewer[colorSchemeSelect]; 

//define default number of quantiles
var quantiles = 5;

this.quantize = d3.scale.quantize()
    //.domain([3, 55])
	// template	http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
	// can set to Oranges, Greens Blues or any other color, and category to 3-8, details seen lib/colorbrewer.js
	.range(colorScheme[quantiles]);
						  
// Set the quantize domain range by getting min and max value of seldata
 this.quantize.domain([
         d3.min(seldata, function (d) {
           return Number(d.rate)
         }),
         d3.max(seldata, function (d) {
           return Number(d.rate)
         })
   ]);	
   
   
   
   

//d3.map(_data,function(d) { rateById.set(d.id, +d.rate); });
d3.map(seldata,function(d) { rateById.set(d.id, +d.rate); });


this.rateById = rateById;
this.seldata = seldata;


}

PopmapallVis.prototype.updateVis = function(){

  _us = this.us;
  var quantize = this.quantize;
  var rateById = this.rateById;
  var seldata = this.seldata;
  var width = this.width;
  var height = this.heigth;
  var path = this.path;
  var handler = this.eventHandler;
  
  // remove old graph
  this.svg.selectAll("g").transition().duration(25).remove();
  this.svg.selectAll('g.legendEntry').remove();

var county_ids = {};
var xpos = [];
var ypos = [];
  
var node =  this.svg.append("g")
      .attr("class", "counties hvr-grow")
	  .style("cursor", "pointer")	
    .selectAll("path")
      .data(topojson.feature(_us, _us.objects.counties).features)
    .enter().append("path")
	//.transition()
      .attr("fill", function(d) { return quantize(rateById.get(d.id)); })
      .attr("d", path)
	  .attr('id', function(d,i){
            county_ids[('c'+d.id)] = [];
            return 'c'+d.id})
	  .attr('xpos', function(d,i){return path.centroid(d)[0]})
      .attr('ypos', function(d,i){return path.centroid(d)[1]})
	  .append("title").text(function(d) {
	       var fullname;
	       for (i = 0; i < seldata.length; i ++) {
             if(seldata[i].id == d.id) {
			   ctname = seldata[i].ctyname;
			   var stname = seldata[i].stname;
			   fullname = ctname.concat(",",stname," ");
		       break;	 
	           }
              }     
			        // return the cty, st name and the % when hover on
					return fullname + (rateById.get(d.id) * 100).toPrecision(2) + "%";
				});

	  //.attr("data-legend",function(d) { return quantize(rateById.get(d.id));});
 
var nod = this.svg;





 
  for (i = 0; i < seldata.length; i ++) {
  
     if(seldata[i].id == "1001") {
	    console.log(seldata[i].ctyname);
		break;	 
	 }
  }

  // To do: to change the states class css attribute as a function, which takes eventhandler from treemap
  // when us.objects.states match in the us match with the state number in treemap, that state shows a different fill
  // http://chimera.labs.oreilly.com/books/1230000000345/ch12.html#_choropleth the graph 
    
     this.svg.append("path")
      .datum(topojson.mesh(_us, _us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
	  
	  
  var legend = this.svg.selectAll('g.legendEntry')
    .data(quantize.range())
    .enter()
    .append('g').attr('class', 'legendEntry');

legend
    .append('rect')
    .attr("x", width - 190)
    .attr("y", function(d, i) {
       return i * 20 + 301.5;
    })
   .attr("width", 10)
   .attr("height", 10)
   .style("stroke", "black")
   .style("stroke-width", 1)
   .style("fill", function(d){return d;}); 
       //the data objects are the fill colors

legend
    .append('text')
    .attr("x", width - 175) //leave 5 pixel space after the <rect>
    .attr("y", function(d, i) {
       return i * 20 + 300;
    })
    .attr("dy", "0.8em") //place text one line *below* the x,y point
    .text(function(d,i) {
        var extent = quantize.invertExtent(d);
        //extent will be a two-element array, format it however you want:
        var format = d3.format("0.2f");
        return format(+(extent[0]*100)) + " - " + format(+(extent[1]*100)) + " % ";
    });
    

//var nod = this.svg.select('.counties hvr-grow');

d3.select(self.frameElement).style("height", height + "px");
 var brush = this.svg.append("g")
      .attr("class", "brush")
      .call(d3.svg.brush()
        .x(d3.scale.identity().domain([0, 860]))
        .y(d3.scale.identity().domain([0, 420]))
		//.style("pointer-events", "none")
		.on('brushend', function(){

var extent = d3.event.target.extent();
selected_data = [];
selected_counties = [];
var keys = Object.keys(county_ids);

//select counties
    for(i=0; i<keys.length; i++){
        var key = keys[i];
        //var county = this.svg.select('#'+key);
		var county = nod.select('#'+key);

        if (county[0][0] != null){
            var xpos = county[0][0].getAttribute('xpos');
            var ypos = county[0][0].getAttribute('ypos');
            
           if(extent[0][0] <= xpos && xpos< extent[1][0] && extent[0][1] <= ypos && ypos < extent[1][1]){ 
                //selected_data.push(key);
                selected_counties.push(key.slice(1));
				node.classed("selected");
            }
        }
    }
//console.log(selected_counties);
//console.log(selected_data);
//$(this.eventHandler).trigger("selectionChanged", selected_counties);


$(handler).trigger("selectionChanged", [selected_counties]);
//$(handler).trigger("selectionChanged", [a,b,c,d,e]);
//console.log(selected_counties);
}));		
    

}