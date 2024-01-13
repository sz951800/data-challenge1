// Function to create and return pie chart data
const createPieData = (data) => ({
    labels: ['A-, A, A+', 'B-, B, B+', 'C-, C, C+'],
    datasets: [{
        data: [
            data['A-'] + data['A'] + data['A+'], 
            data['B-'] + data['B'] + data['B+'], 
            data['C-'] + data['C'] + data['C+']
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4
    }]
});

// Options for the pie charts
const options = {
    plugins: {
        datalabels: {
            color: '#000',
            formatter: (value, context) => {
                let sum = context.dataset._meta[Object.keys(context.dataset._meta)[0]].total;
                let percentage = (value / sum * 100).toFixed(2) + "%";
                return percentage;
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
        labels: {
            boxWidth: 10,
            padding: 20
        }
    },
    
    title: {
        display: true,
        text: '', // Title for the chart (will be customized for each chart)
        position: 'top',
        fontSize: 16
    }
};

// Function to create and return a new chart
const createChart = (context, data, title) => {
    options.title.text = title; // Set the title for the chart
    return new Chart(context, {
        type: 'pie',
        data: data,
        options: options
    });
};

// Create the first pie chart
const ctx1 = document.getElementById('pieChart1').getContext('2d');
const pieData1 = createPieData({
    'A+': 116, 'B': 13, 'B-': 9, 'B+': 31, 'A-': 35, 'C+': 5, 'A': 36, 'C': 1, 'C-': 1
});
createChart(ctx1, pieData1, 'Property Submarket Grade Distribution');

// Create the second pie chart
const ctx2 = document.getElementById('pieChart2').getContext('2d');
const pieData2 = createPieData({
    'A+': 76, 'B': 52, 'B-': 40, 'B+': 36, 'A-': 15, 'C+': 13, 'A': 13, 'C': 1, 'C-': 1
});
createChart(ctx2, pieData2, 'Property Market Grade Distribution');

// Create the third pie chart (customize the data and title as needed)
const ctx3 = document.getElementById('pieChart3').getContext('2d');
const pieData3 = createPieData({
    // Customize the data for the third chart
    'B-': 115, 'B': 40, 'B+': 33, 'C+': 23, 'A-': 17, 'A+': 13, 'A': 6, 'C': 0, 'C-': 0
});
createChart(ctx3, pieData3, 'Submarket Grade Distribution');


// Add a single explanation below all the charts
const explanation = document.getElementById('chart-explanation');
explanation.textContent = 'These charts show the distribution of property grades on the earlist recorded value after their delivered month for all the delivered properties, only those properties with recorded values in the properties grades are displayed here.'


