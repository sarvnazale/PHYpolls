// script.js
google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(() => {
    drawChart();
    populateDataTable();
});

function drawChart() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQy8p_8A6lUPVEJSeaJLs5_TTWTUgQ1Y1z_q4qoOACWiXhqS3mknqQgczvBBtRRXnTxmbw71VMGN0AL/pubhtml')
        .then(response => response.text())
        .then(data => {
            var dataArray = google.visualization.arrayToDataTable(parseData(data));

            var options = {
                // Add chart options here
                title: 'My Google Sheet Chart',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(dataArray, options);
        });
}

function parseData(data) {
    // Assuming CSV format: Convert CSV to a 2D array
    return data.split('\n').map(row => row.split(','));
}

function populateDataTable() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQy8p_8A6lUPVEJSeaJLs5_TTWTUgQ1Y1z_q4qoOACWiXhqS3mknqQgczvBBtRRXnTxmbw71VMGN0AL/pubhtml')
        .then(response => response.text())
        .then(data => {
            var dataArray = parseData(data);
            var table = document.getElementById('data_table');

            // Clear existing table rows
            table.innerHTML = '';

            // Add header row
            var headerRow = table.insertRow(0);
            dataArray[0].forEach(header => {
                var cell = headerRow.insertCell(-1);
                cell.textContent = header;
            });

            // Add data rows
            for (var i = 1; i < dataArray.length; i++) {
                var row = table.insertRow(-1);
                dataArray[i].forEach(cellData => {
                    var cell = row.insertCell(-1);
                    cell.textContent = cellData;
                });
            }
        });
}
