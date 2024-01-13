// The JSON data

function createBarChart() {

const jsonData = '{"(0.0, 10.0]":87,"(10.0, 20.0]":137,"(20.0, 30.0]":18,"(30.0, 40.0]":5}';

// Parse the JSON data
const data = JSON.parse(jsonData);
const dataset = Object.keys(data).map(key => ({ range: key, count: data[key] }));

// Set dimensions and margins of the graph
const margin = {top: 50, right: 20, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select("#bar-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X axis
const x = d3.scaleBand()
  .range([0, width])
  .domain(dataset.map(d => d.range))
  .padding(0.2);
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));


  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width / 2+35)
  .attr("y", height + margin.top )
  .text("Number of Months");
 

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d.count)])
  .range([height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));


  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 25)
  .attr("x", -margin.top+20)
  .text("Number of Properties");

// Bars
svg.selectAll("mybar")
  .data(dataset)
  .enter()
  .append("rect")
    .attr("x", d => x(d.range))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.count))
    .attr("fill", "#69b3a2");

    svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2+10))
    .attr("text-anchor", "middle")  
    .style("font-size", "20px") 
    .text("Delivered Time Distribution");
}

createBarChart();
