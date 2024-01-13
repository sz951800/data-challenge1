function createTable() {
    const data = [
        { market: 'Market 1', totalNumber: 869, delivered: 293, averageDeliveredTime: '13 months', negativeEffectRentGrowth: 104 },
        { market: 'Market 2', totalNumber: 99, delivered: 5, averageDeliveredTime: '8 months', negativeEffectRentGrowth: 0 }
    ];

    // Define the features (headers for the rows)
    const features = ['Market', 'Total Number', 'Delivered', 'Average Delivered Time', 'Negative Effect Rent Growth'];

    // Create a table element
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');

    // Add a row for each feature
    features.forEach((feature, index) => {
        let tr = table.insertRow(-1);
        
        let th = document.createElement('th');
        th.innerHTML = feature;

        // Add a class to the first column cells
        if (index === 0) {
            th.className = 'first-column';
        }

        tr.appendChild(th);

        data.forEach(item => {
            let td = document.createElement('td');
            td.innerHTML = (index === 0) ? item.market : item[Object.keys(item)[index]];

            // Add a class to the first column cells
            if (index === 0) {
                td.className = 'first-column';
            }

            tr.appendChild(td);
        });
    });

    // Create a title div element
    const titleDiv = document.createElement('div');
    titleDiv.className = 'table-title';


    titleDiv.style.fontSize = '20px'; // Adjust the font size as needed
titleDiv.style.fontWeight = 'bold';
titleDiv.style.position = 'absolute'; // Set the position to absolute
titleDiv.style.top = '-50px'; // Adjust the top position as needed
titleDiv.style.right = '40px'; // Adjust the right position as needed



    titleDiv.innerHTML = 'Summary data for delivered properties'; // Replace with your desired title

    // Append the title to the container
    const container = document.getElementById('table-container');
    container.innerHTML = ''; // Clear any existing content
    container.appendChild(titleDiv);

    // Append the table to the container
    container.appendChild(table);
}

createTable();
