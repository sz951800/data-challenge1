

d3.json("twelvemonth.json").then(function (data) {
    // Define SVG dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    // Parse the date / time
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%L");

    // Format the data - create an array of { date, value } objects
    const formattedData = data.index.map((d, i) => {
        return { date: parseTime(d), value: data.data[i] };
    });

    // Define the ranges
    const xScale = d3.scaleTime()
        .domain(d3.extent(formattedData, d => d.date))
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(formattedData, d => d.value), d3.max(formattedData, d => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    // Define the line
    const valueline = d3.line()
        .defined(d => !isNaN(d.value)) // Exclude NaN values
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));

    // Append an SVG element to the container
    const svg = d3.select("#line-chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the valueline path
    svg.append("path")
        .data([formattedData])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale).tickSize(-width + margin.left + margin.right);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

    // Add x-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 4)
        .style("text-anchor", "middle")
        .text("Date");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -height / 2)
        .attr("y", margin.left / 3)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Value");

    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .style("text-anchor", "middle")
        .text("Line Chart of Data Over Time");


        const dots = svg.selectAll(".dot")
        .data(formattedData)
        .enter().append("g")
        .attr("class", "dot");

        const formatTime = d3.timeFormat("%Y-%m");

    // Append a circle for each data point
    dots.append("circle")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.value))
        .attr("r", 3) // radius of the circle
        .attr("fill", "steelblue")
        .on("mouseover", function(d) {
            d3.select("#tooltip")
                .style("visibility", "visible")
                .style("top", (d3.event.pageY - 10) + "px")
                .style("left",(d3.event.pageX + 10) + "px")
                .html("Month: " + formatTime(d.date) + "<br>Value: " + d.value);
        })
        .on("mouseout", function() {
            d3.select("#tooltip").style("visibility", "hidden");
        });


});
