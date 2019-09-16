import React , { Component }  from 'react';
import axios from 'axios';
import auth0Client from './auth';
import * as d3 from "d3";



class Graph extends Component {
	constructor(props) {
      super(props);
      this.state = {
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
      await this.getData();
      var data = this.state.sourceData[0].data;
      console.log("data");
      console.log(data);
    	var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
		var svg = d3.select(this.refs.data_graph)
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform",
		          "translate(" + margin.left + "," + margin.top + ")");

		// Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return Date.parse(d.date); }))
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.value; }))
      .range([ height, 0 ]);

    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(Date.parse(d.date)) })
        .y(function(d) { return y(d.value) })
        )
    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(Date.parse(d.date)) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("fill", "#69b3a2")
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

    updateGraph = () => {
      console.log("Updating graph");
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
        <div className="GRAPH" ref="data_graph"></div>
        </div>
      )
      
    }
}
export default Graph;