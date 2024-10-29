let csvData = null;

// Función para cargar y leer el archivo CSV
document.getElementById("csvFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        csvData = parseCSV(contents); // función de análisis CSV (definida más adelante)
        console.log("Datos CSV cargados:", csvData);
    };
    reader.readAsText(file);
});

// Función para parsear el contenido del CSV
function parseCSV(contents) {
    const rows = contents.trim().split("\n");
    return rows.map(row => row.split(","));
}

// Lógica para entrenar el modelo
document.getElementById("trainButton").addEventListener("click", function() {
    if (!csvData) {
        alert("Por favor, cargue un archivo CSV primero.");
        return;
    }

    const trainTestSplit = document.getElementById("trainTestSplit").value / 100;
    const modelType = document.getElementById("algorithmSelect").value;
    const inputVariables = document.getElementById("inputVariables").value.split(","); // Variables de entrada
    const outputVariable = document.getElementById("outputVariable").value; // Variable de salida

    // Crear instancia del modelo usando tytus.js
    const model = new TytusML.Model({
        type: modelType,
        split: trainTestSplit,
        inputs: inputVariables,
        output: outputVariable
    });

    model.train(csvData, function(result) {
        console.log("Entrenamiento completado:", result);
        alert("Entrenamiento completado.");
    });
});

// Lógica para realizar predicciones
document.getElementById("predictButton").addEventListener("click", function() {
    if (!csvData) {
        alert("Por favor, cargue un archivo CSV primero.");
        return;
    }

    const xRange = document.getElementById("xRange").value.split("-").map(Number);
    const prediction = model.predict(xRange);
    console.log("Predicción:", prediction);
    alert("Predicción realizada.");
});

// Lógica para mostrar las gráficas
document.getElementById("showGraphButton").addEventListener("click", function() {
    // Lógica para mostrar gráficas (puedes usar cualquier librería de JavaScript)
    console.log("Mostrando gráficas...");
});
