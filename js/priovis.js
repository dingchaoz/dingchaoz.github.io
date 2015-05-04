/**
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
PrioVis = function(_parentElement, _data,_eventHandler){
    this.parentElement = _parentElement;
    //console.log(_data);
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // defines constants
    this.margin = {top: 20, right: 20, bottom: 70, left: 20},
    //this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
	this.width = 410 - this.margin.left - this.margin.right,
    this.height = 415 - this.margin.top - this.margin.bottom;

    this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
PrioVis.prototype.initVis = function(){

	// constructs SVG layout
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // creates axis and scales
    this.x = d3.scale.ordinal()
	    .rangeRoundBands([0, this.width], 15);

    this.y = d3.scale.linear()
	     .range([0,this.height]);
      

    //this.color = d3.scale.category10();
	this.color = d3.scale.linear()
	             .range(["purple","steelblue","orange","green","red"]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale((this.y))
	  //.ticks(6)
      .orient("left");

    // Add axes visual elements
    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")");
	  //.attr("transform", "rotate(-90)");
	  
	  
	 this.svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
        //.text("Call volume, daily");

    // filter, aggregate, modify data
    this.wrangleData(null);

    // call the update method
    this.updateVis();
}


/**	
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
//PrioVis.prototype.wrangleData= function(selectionStart, selectionEndn){
//PrioVis.prototype.wrangleData= function(_filterFunction){
PrioVis.prototype.wrangleData= function(){


    _year = this.year;
	_age = this.age;

    // displayData should hold the data whiche is visualized
    data = this.data;
	
	passdata = this.passdata;
	
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
	
	
	//filter by year, age, TO DO, change this by input later
	function fltbycounty(value) {
	 if (passdata.indexOf(value.id) >= 0){
	     return value;
	 }
	};
	
	//filter data
    var flter = data.filter(flt);

    if (passdata != "" && passdata != null) {
	
	   flter = flter.filter(fltbycounty);
	
	}
     	
	
	// reseve for selected data
	
	var seldata = [];
	
	AF = 0;
	WF = 0;
	BF = 0;
	HF = 0;
	NF = 0;
	AM = 0;
	WM = 0;
	BM = 0;
	HM = 0;
	NM = 0;
	NF = 0;
	
	divider = flter.length;
	// now select different race's population and push into display data;
	flter.forEach(function (d) {
	
	AF += Number(d.AA_FEMALE);
	AM += Number(d.AA_MALE);
	
	WF += Number(d.WA_FEMALE);
	WM += Number(d.WA_MALE);
	
	BF += Number(d.BA_FEMALE);
	BM += Number(d.BA_MALE);
	
	HF += Number(d.H_FEMALE);
	HM += Number(d.H_MALE);
	
	NF += Number(d.IA_FEMALE);
	NM += Number(d.IA_MALE);

	});
	if (isNaN(AF)) {
	  //seed = Math.floor(Math.random()*0.8) + 1;
	  
	  seldata.push(22/divider,23/divider,600/divider,700/divider,60/divider,65/divider,70/divider,75/divider,20/divider,25/divider);
	  seldata.map(function(d){return d * ((Math.random()*0.8) + 1.2);});
	}
	else {
	  seldata.push(AF/divider,AM/divider,WF/divider,WM/divider,HF/divider,HM/divider,BF/divider,BM/divider,NF/divider,NM/divider);
	}
	
	console.log(seldata);
	
	this.displayData = seldata;
	
	
}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
PrioVis.prototype.updateVis = function(){

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};

    var that = this;
	
	this.displayData.prio = ["Asian","White","Hispanic","Black","Native"];
	//this.displayData.prio = ["Asian  ","White  ","Hispanic  ","Black  ","Native  "];
	
	this.x.domain([0,this.displayData.prio]);
	//this.x.domain([0,10]);
	this.y.domain([0,Math.max.apply(null,this.displayData)]);
	//this.y.domain([0,Math.log(Math.max.apply(null,this.displayData)*1000)]);
	//this.color.domain([0,(this.displayData.length/2)]);
	this.color.domain([1,2,3,4,5]);
	//this.color.domain(this.displayData.map(function(d,i) { return i }));

    // updates axis
    //this.svg.select(".x.axis")
        //.call(this.xAxis);
		//.attr("transform", "translate(0,0)");
    
		
	//this.svg.select(".y.axis")
        //.call(that.yAxis);

    // updates graph
	this.svg.selectAll(".bar").remove();
	this.svg.selectAll("rect").remove();
	this.svg.selectAll("text").remove();
	this.svg.selectAll('g.legendEntry').remove();
	
	var band_width = this.width/16;

    // Data join
    var bar = this.svg.selectAll(".bar");

	
	  bar
      //.data(this.displayData, function(d) { return d; });
	  .data(this.displayData)
	  .enter()
	  .append("g")
	  .append("rect")
	  .attr("y",function(d) {return that.height - that.y(d);
	  
	  })
	
	  .attr("x", function(d,i){
	  
	    if(i%2 == 0) {
	     return i * band_width + (i)*15;
		 }
		 else {
		  return i * band_width + (i-1)*15;
		 }
	   console.log(i);
	})
	  .attr("width", band_width)
      .style("fill", function(d,i) {
  
		return that.color(Math.ceil((i+0.5)/2));
		console.log(i);
      })
      .transition()
	  .style("stroke", function(d, i){  
	    if (i%2 == 0) { return "black" ;}
		else {return "red" ;}
	  
	  })
      .attr("height", function(d, i) {
		  return (that.y(d));
		  console.log(d);;
      });
	  
	  //append label to bar
	  this.svg.selectAll("text")
          .data(this.displayData)
          .enter()
          .append("text")
		  .text(function(d) {
               return (d*100).toPrecision(2) + "%";
            })
		  .attr("x", function(d,i){
		  
		  if (i == 0) {return 8};
		  if (i == 1) {return 45};
		  if (i == 2) {return 85};
		  if (i == 3) {return 115};
		  if (i == 4) {return 160};
		  if (i == 5) {return 190};
		  if (i == 6) {return 240};
		  if (i == 7) {return 270};
		  if (i == 8) {return 300};
		  if (i == 9) {return 333};
	
		  
	   })
	   .attr("y",function(d) {return that.height - that.y(d);
	  
	   })
	   .attr("font-family", "sans-serif")
       .attr("font-size", "8px")
	   .attr("text-anchor", "middle");
       //.attr("fill", "white");
	   
	var leg =   ["purple", "steelblue", "orange", "green", "red","white","white"] 
	   
	   	  
  var legend = this.svg.selectAll('g.legendEntry')
    //.data(this.color.range())
	.data(leg)
    .enter()
    .append('g').attr('class', 'legendEntry');

legend
    .append('rect')
    .attr("x", this.width - 82)
    .attr("y", function(d, i) {
       return i * 20 + 11.5;
    })
   .attr("width", 10)
   .attr("height", 10)
   .style("stroke", function(d, i){  
	    if (i == 5) { return "red" ;}
		if (i == 6) { return "black" ;}
	  
	  })
   .style("stroke-width", 1)
   .style("fill", function(d){return d;}); 
       //the data objects are the fill colors

legend
    .append('text')
    .attr("x", this.width - 67) //leave 5 pixel space after the <rect>
    .attr("y", function(d, i) {
       return i * 20 + 10;
    })
    .attr("dy", "0.8em") //place text one line *below* the x,y point
    .text(function(d,i) {
          if (i == 0) {return "Asian"};
		  if (i == 1) {return "White"};
		  if (i == 2) {return "Hispanic"};
		  if (i == 3) {return "Black"};
		  if (i == 4) {return "Native"};
		  if (i == 5) {return "Female"};
		  if (i == 6) {return "Male"};
    });
	  

}



// Get inputs from menu and call wrangle data, update vis
PrioVis.prototype.change = function(_input) {


this.year = _input.year;
console.log(_input);
//this.race = _input.race;
//this.gender = _input.gender;
this.age = _input.age;
//if(this.year != null || this.age != null)
//if (this.race == null)
//{
  this.wrangleData(null);
  this.updateVis();
//}

}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
PrioVis.prototype.onSelectionChange = function (passdata){

    // TODO: call wrangle function
    //var that = this;
	
	// displayData should hold the data whiche is visualized
    this.passdata = passdata;
	//console.log(data);
	//console.log(passdata);
	


	this.wrangleData();
    this.updateVis();
}


/**
 * Helper function that figures if there is sufficient space
 * to fit a label inside its bar in a bar chart
 */
PrioVis.prototype.doesLabelFit = function(datum, label) {
  var pixel_per_character = 6;  // obviously a (rough) approximation

  return datum.type.length * pixel_per_character < this.x(datum.count);
}

/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */
//PrioVis.prototype.filterAndAggregate = function(selectionStart, selectionEnd){
PrioVis.prototype.filterAndAggregate = function(_filter){

    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    var filter = function(){return true;}
    if (_filter != null){
        filter = _filter;
    }
    //Dear JS hipster, a more hip variant of this construct would be:
    // var filter = _filter || function(){return true;}
	
	//var ds = selectionStart;
	//var de = selectionEnd;
	//console.log(selectionStart);
	//console.log(ds);
    
    //function filterBytime(element) {
      //if (element.time <= de && element.time >= ds) {
         //return true;
      //} else {
         //return false;
      //}
    //};

    //var that = this;
	
	var flt = this.data.filter(filter);

    var res = [];
	
	for (i = 0; i < 16; i++) {
	       res.push(d3.sum(flt, function(d) {return d.prios[i]}));
		   //console.log(res);
	    }
		
	console.log(res);
   
	

    res.prio = [];
    //for (i = 100; i < 116; i++)	{
	       //res.prio.push(this.metaData.choices[i]);
	    //}
	//console.log(res.prio);
	
	return res;
    //var counts = Object();

    // Convert data into summary count format
    //this.data
      //.filter(filter)
      //.forEach(function(d) {
        //d.calls.forEach(function(c) {
          //c.type in counts ? counts[c.type]++ : counts[c.type] = 1;
        //});
      //});

    // Convert counts to an array and keep only the top 10
    //counts = Object.keys(counts)
      //.map(function (key) {return {"type": key, "count": counts[key]}; })
      //.sort(function(a, b) { return a.count < b.count || (a.count === b.count) - 1; })
      //.slice(0, 20);

    //return counts;
}
