import React , { Component }  from 'react';
import axios from 'axios';
import auth0Client from './auth';
import * as d3 from "d3";



class Graph extends Component {
	constructor(props) {
      super(props);
      this.width   = null;
      this.height  = null;
      this.svg     = null;
      this.x       = null;
      this.y       = null;
      this.line    = null;
      this.lines   = null;


      this.state = {
        loading: true,
      	data: [{x: 1, y: 5},
      	      {x: 2, y: 10},
      	      {x: 3, y: 11},
      	      {x: 4, y: 13},
      	      {x: 5, y: 15},],
        sourceData: [],
        selectedData: [],
      }
    }


    async componentDidMount() {
      console.log("Mounting Component");
      await this.getData();
      console.log("got data");
      var data = this.state.sourceData;
      console.log("data");
      console.log(data);
    	var margin = {top: 10, right: 30, bottom: 30, left: 110},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        this.width = width;
        this.height = height;

        // append the svg object to the body of the page
		var svg = d3.select(this.refs.data_graph)
		  .append("svg")
		    .attr("width", width + margin.left + margin.right + 50)
		    .attr("height", height + margin.top + margin.bottom + 50)
		  .append("g")
		    .attr("transform",
		          "translate(" + (margin.left-50) + "," + (margin.top+50) + ")");

        this.svg = svg;
        console.log(this.svg);
     // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet2);

    this.myColor = myColor;

		// Add X axis --> it is a date format
    var x_min = Math.min.apply(null, data.map((sensor)=> {
      return Math.min.apply(null, sensor.data.map((d)=>{
        return Date.parse(d.date);
      }));
    }));
    var x_max = Math.max.apply(null, data.map((sensor)=> {
      return Math.max.apply(null, sensor.data.map((d)=>{
        return Date.parse(d.date);
      }));
    }));

    var y_min = Math.min.apply(null, data.map((sensor)=> {
      return Math.min.apply(null, sensor.data.map((d)=>{
        return d.value;
      }));
    }));
    var y_max = Math.max.apply(null, data.map((sensor)=> {
      return Math.max.apply(null, sensor.data.map((d)=>{
        return d.value;
      }));
    }));

    var x = d3.scaleTime()
      .domain([x_min, x_max])
      .range([ 0, width]);

    this.x = x;

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([y_min, y_max])
      .range([ height, 0 ]);

    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));

    // Add the lines
   var line = d3.line()
        .x(function(d) { return x(Date.parse(d.date)) })
        .y(function(d) { return y(d.value) });
        
    svg.selectAll("myLines")
      .data(data)
      .enter()
      .append("path")
        .attr("class", "graph-line")
        .attr("d", function(d){ return line(d.data) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(data)
      .enter()
        .append('g')
        .attr("class", "graph-dots")
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.data })
      .enter()
      .append("circle")
        .attr("class", "graph-dot")
        .attr("cx", function(d) { return x(Date.parse(d.date)) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

     // Add a legend at the end of each line
    svg
      .selectAll("myLabels")
      .data(data)
      .enter()
        .append("text")
          .attr("class", "graph-label")
          .datum(function(d) { return {name: d.name, value: d.data[0]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(Date.parse(d.value.date)) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
    }

    updateGraph = () => {
      if (this.state.loading == true || this.svg == null) return;

      var t = d3.transition()
        .duration(750);

      // if (this.state.selectedData.length == 0) return;
      console.log("Updating graph");
      console.log(this.svg);
      var data = this.state.sourceData.filter((d, i) => {
        return (this.state.selectedData.indexOf(i) > -1);
      });

      var x_min = Math.min.apply(null, data.map((sensor)=> {
      return Math.min.apply(null, sensor.data.map((d)=>{
        return Date.parse(d.date);
      }));
      }));
      var x_max = Math.max.apply(null, data.map((sensor)=> {
        return Math.max.apply(null, sensor.data.map((d)=>{
          return Date.parse(d.date);
        }));
      }));

      var y_min = Math.min.apply(null, data.map((sensor)=> {
        return Math.min.apply(null, sensor.data.map((d)=>{
          return d.value;
        }));
      }));
      var y_max = Math.max.apply(null, data.map((sensor)=> {
        return Math.max.apply(null, sensor.data.map((d)=>{
          return d.value;
        }));
      }));

      var x = d3.scaleTime()
        .domain([x_min, x_max])
        .range([ 0, this.width]);

      this.svg.select(".x")
        .transition()
          .call(d3.axisBottom(x));
        
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([y_min, y_max])
        .range([ this.height, 0 ]);

       this.svg.select(".y")
        .transition()
          .call(d3.axisLeft(y));

      var line = d3.line()
        .x(function(d) { return x(Date.parse(d.date)) })
        .y(function(d) { return y(d.value) });

      var l = this.svg.selectAll(".graph-line")
          .data(data);

      l.enter()
        .append("path")
        // .transition(t)
        .merge(l)
        .attr("class", "graph-line")
        .attr("d", (d) => { return line(d.data) } )
        .attr("stroke", (d) => { return this.myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

      l.exit().remove();

      var dots = this.svg.selectAll(".graph-dots")
        .data(data);

      dots.exit().remove();

      var dot = dots.enter()
        .append('g')
        .attr('class', "graph-dots")
        .merge(dots)
        .style("fill", (d) =>{ return this.myColor(d.name) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("circle")
        .data(function(d){ return d.data });

      dot.enter()
        .append("circle")
          .attr("class", "graph-dot")
          .merge(dot)
          .attr("cx", function(d) { return x(Date.parse(d.date)) } )
          .attr("cy", function(d) { return y(d.value) } )
          .attr("r", 5)
          .attr("stroke", "white");

       // Add a legend at the end of each line
    var labels = this.svg
      .selectAll(".graph-label")
      .data(data)


     labels.exit().remove();

    labels
      .enter()
        .append("text")
          .merge(labels)
          .attr("class", "graph-label")
          .attr("transform", function(d) { return "translate(" + x(Date.parse(d.data[0].date)) + "," + y(d.data[0].value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", (d) => { return this.myColor(d.name) })
          .style("font-size", 15);
    }

    getData = async() => {
      this.setState({loading: true});
      try {
        var res = await axios.get(`http://localhost:2000/api/data?type=${this.props.sourceType}`, 
          {
           headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
          });
        console.log(res.data)
        this.setState({loading: false, sourceData: res.data});
      }
      catch(err) {
        console.log(err);
      }
    }

    


    handleInputChange = (e) => {
      var ind = Number(e.target.getAttribute("index"));
      var arr = [...this.state.selectedData];;
      var loc = arr.indexOf(ind);
      if (loc > -1) {
        arr.splice(loc, 1);
        this.setState({
          selectedData : arr,
        });
      }
      else {
        arr.push(ind)
        this.setState({
          selectedData : arr,
        });
      }
    }


    render() {
      this.updateGraph();
      return (
        <div>
        <form> 
        {this.state.sourceData && this.state.sourceData.map((d, i)=>{
          return (
          <>
          <label>
          {d.name}
          <input
            name="isGoing"
            type="checkbox"
            index={i}
            key={i}
            checked={this.state.selectedData.indexOf(i) > -1}
            onChange={this.handleInputChange} />
          </label>
        </>)
        })}
        </form>
        <br/>
        {this.state.selectedData.length == 0 &&
          <p>Select a source to see most recent values plotted below: </p>}
        <div className="GRAPH" ref="data_graph"></div>
        </div>
      )
      
    }
}
export default Graph;
