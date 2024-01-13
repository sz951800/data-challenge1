function createDonutChart() {
    const data = {
        'Negative': 104,
        'Non-Negative': 298 - 104
    };

    // Set dimensions of the canvas
    const width = 600;
    const height = 350; // Increased the height to accommodate the title and chart
    const radius = Math.min(width, height) / 2 -40;

    // Create an SVG container
    const svg = d3.select('#donut-chart-container').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // Create the pie chart
    const pie = d3.pie().value(d => d[1]);
    const data_ready = pie(Object.entries(data));

    // Set the color scale
    const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(['#ff9999', '#99ff99']);

    // Build the donut chart
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.5) // Adjust inner radius for the donut shape
        .outerRadius(radius);

    svg.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data[0]));

    // Add labels with numbers
    svg.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data[1]) // Displaying the number
        .attr('transform', d => 'translate(' + arcGenerator.centroid(d) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', 15);

    // Legend
    const legendSize = 20;
    const legendSpacing = 5;

    const legendXOffset = 150; // Horizontal offset for the legend
    const legendYOffset = -100;

    const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${legendXOffset}, ${legendYOffset + i * (legendSize + legendSpacing)})`);

    // Legend rectangles
    legend.append('rect')
        .attr('width', legendSize)
        .attr('height', legendSize)
        .style('fill', color)
        .style('stroke', color);

    // Legend labels
    legend.append('text')
        .attr('x', legendSize + legendSpacing)
        .attr('y', legendSize - legendSpacing)
        .text(d => d);

    // Title
    svg.append('text')
        .attr('x', 0)
        .attr('y', -height / 2 + 20) // Adjusted vertical position of the title
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .text('Effect Rent Growth Distribution');
}

createDonutChart();
