let csvData = null;

// Cargar Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initialize);

// Inicializar evento para leer el archivo CSV
document.getElementById("csvFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        csvData = parseCSV(contents);
        console.log("Datos CSV cargados:", csvData);
    };
    reader.readAsText(file);
});

// Parsear el archivo CSV
function parseCSV(contents) {
    const rows = contents.trim().split("\n");
    return rows.map(row => row.split(",").map(Number));
}

// Entrenar el modelo
document.getElementById("trainButton").addEventListener("click", function() {
    if (!csvData) {
        alert("Por favor, cargue un archivo CSV primero.");
        return;
    }

    const trainTestSplit = document.getElementById("trainTestSplit").value / 100;
    const modelType = document.getElementById("algorithmSelect").value;

    const linear = new LinearRegression();
    linear.fit(csvData.map(row => row[0]), csvData.map(row => row[1]));
    const yPredict = linear.predict(csvData.map(row => row[0]));

    console.log("Y Predicted:", yPredict);
    drawChart(csvData.map(row => row[0]), csvData.map(row => row[1]), yPredict);
});

// Dibujar gráfico con datos reales y predicción
function drawChart(xTrain, yTrain, yPredict) {
    const dataArray = [['X', 'Y Real', 'Y Predicción']];
    for (let i = 0; i < xTrain.length; i++) {
        dataArray.push([xTrain[i], yTrain[i], yPredict[i]]);
    }

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
        title: 'Regresión Lineal',
        seriesType: 'scatter',
        series: {1: {type: 'line'}},
        hAxis: { title: 'X' },
        vAxis: { title: 'Y' }
    };

    const chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
