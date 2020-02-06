function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}
 
//$(document).ready(function () {
    //power_share();
//});


function power_share(datafile, divid) {
    
    var radius = 74,
        padding = 10;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 30);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    d3.csv(datafile, function(error, data) {
      if (error) throw error;

      

      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Country"; }));

      data.forEach(function(d) {
        d.ages = color.domain().map(function(name) {
          return {name: name, population: +d[name]};
        });
      });

      var legend = d3.select("#divid").append("svg")
          .attr("class", "legend")
          .attr("width", radius * 2)
          .attr("height", radius * 2)
        .selectAll("g")
          .data(color.domain().slice().reverse())
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) { return d; });

      var svg = d3.select("#plot").selectAll(".pie")
          .data(data)
        .enter().append("svg")
          .attr("class", "pie")
          .attr("width", radius * 2)
          .attr("height", radius * 2)
        .append("g")
          .attr("transform", "translate(" + radius + "," + radius + ")");

      svg.selectAll(".arc")
          .data(function(d) { return pie(d.ages); })
        .enter().append("path")
          .attr("class", "arc")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.name); });

      svg.append("text")
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.Country; });

    });
    
  }



  function dashboard(id, fData){
    var barColor = "steelblue";
    function segColor(c){ return {Year2005:"#98abc5", Year2010:"#6b486b",Year2015:"#ff8c00"}[c]; }
   
    
    // compute total for each state.
    fData.forEach(function(d){d.total=d.freq.Year2005+d.freq.Year2010+d.freq.Year2015;});
    
    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 20, r: 10, b: 80, l: 0};
        hGDim.w = 550 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;
            
        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        


        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"))
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.
            
        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle")
            .style("font-size","8px")


        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.Country == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }
        
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);
            
            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });          
        }        
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:220, h: 220};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }        
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.Country,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.Country,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg = {};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend').style("font-size","13px");
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			.attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
        }
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }
    
    // calculate total frequency by segment for all state.
    var tF = ['Year2005','Year2010','Year2015'].map(function(d){ 
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 

    });    
    
    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.Country,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.




}





function women_social() {

    var margin = {top: 40, right: 20, bottom: 90, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");


    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

    var color = d3.scale.ordinal()
    .range(["#d0743c", "#a05d56", "#6b486b","#8a89a6"]);


    var svg = d3.select("#womensocial").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yBegin;

    var innerColumns = {
    "column1" : ["Caring responsibilites","Cooking and household","Sporting, cultural or leisure activities", "Voluntary or charitable activities"]
    }   
    d3.csv("assets/data/female_social.csv", function(error, data) {
    var columnHeaders = d3.keys(data[0]).filter(function(key) { return key !== "State"; });
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));
    data.forEach(function(d) {
        var yColumn = new Array();
        d.columnDetails = columnHeaders.map(function(name) {
            for (ic in innerColumns) {
                if($.inArray(name, innerColumns[ic]) >= 0){
                if (!yColumn[ic]){
                    yColumn[ic] = 0;
                }
                yBegin = yColumn[ic];
                yColumn[ic] += +d[name];
                return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
            }
        }
        });
    d.total = d3.max(d.columnDetails, function(d) { 
        return d.yEnd; 
    });
    });

    x0.domain(data.map(function(d) { return d.State; }));
    x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, d3.max(data, function(d) { 
        return d.total; 
    })]);

    svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Women's caring responsibilites and social activities");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" ); 

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".7em")
        .style("text-anchor", "end")
        .text("");

    var women_project_stackedbar = svg.selectAll(".womens_project_stackedbar")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

        women_project_stackedbar.selectAll("rect")
        .data(function(d) { return d.columnDetails; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { 
            return x1(d.column);
            })
        .attr("y", function(d) { 
            return y(d.yEnd); 
        })
        .attr("height", function(d) { 
            return y(d.yBegin) - y(d.yEnd); 
        })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(columnHeaders.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("y", -40)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", -30)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    });
}





function men_social() {
    var margin = {top: 100, right: 20, bottom: 90, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom")


    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

    var color = d3.scale.ordinal()
    .range(["#d0743c", "#a05d56", "#6b486b","#8a89a6"]);


    var svg = d3.select("#mensocial").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yBegin;

    var innerColumns = {
    "column1" : ["Caring responsibilites","Cooking and household","Sporting, cultural or leisure activities", "Voluntary or charitable activities"]
    }   
    d3.csv("assets/data/men_social.csv", function(error, data) {
    var columnHeaders = d3.keys(data[0]).filter(function(key) { return key !== "State"; });
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));
    data.forEach(function(d) {
        var yColumn = new Array();
        d.columnDetails = columnHeaders.map(function(name) {
            for (ic in innerColumns) {
                if($.inArray(name, innerColumns[ic]) >= 0){
                if (!yColumn[ic]){
                    yColumn[ic] = 0;
                }
                yBegin = yColumn[ic];
                yColumn[ic] += +d[name];
                return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
            }
        }
        });
    d.total = d3.max(d.columnDetails, function(d) { 
        return d.yEnd; 
    });
    });

    x0.domain(data.map(function(d) { return d.State; }));
    x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, d3.max(data, function(d) { 
        return d.total; 
    })]);



    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Men's caring responsibilites and social activities");



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".7em")
        .style("text-anchor", "end")
        .text("");

    var men_project_stackedbar = svg.selectAll(".men_project_stackedbar")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

        men_project_stackedbar.selectAll("rect")
        .data(function(d) { return d.columnDetails; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { 
            return x1(d.column);
            })
        .attr("y", function(d) { 
            return y(d.yEnd); 
        })
        .attr("height", function(d) { 
            return y(d.yBegin) - y(d.yEnd); 
        })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(columnHeaders.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("y", -80)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", -70)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });



    

    });
}


$('#sidebarCollapse').click(function() {
    $('#togglebutton').css({
        'margin-left': 'none'
    });
});


$('sidebarCollapse').click(function() {
    $('#togglebutton').addClass('fa2');
  });
