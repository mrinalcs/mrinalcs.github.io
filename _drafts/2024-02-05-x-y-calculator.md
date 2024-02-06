---
title: Basic Statistical Calculator
---
 

<div class="calculator">
    <h2>Statistics Calculator</h2>
    <table>
        <thead>
            <tr>
                <th>X Values</th>
                <th>Y Values</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" id="values_x"></td>
                <td><input type="text" id="values_y"></td>
            </tr>
        </tbody>
    </table>
    <div id="results"></div>
</div>

<script>
function calculate() {
    let input_x = document.getElementById('values_x').value;
    let input_y = document.getElementById('values_y').value;

    let values_x = input_x.split(',').map(x => parseFloat(x.trim()));
    let values_y = input_y.split(',').map(y => parseFloat(y.trim()));

    if (values_x.length === 0 || isNaN(values_x[0]) || values_y.length === 0 || isNaN(values_y[0])) {
        document.getElementById('results').innerHTML = "";
        return;
    }

    let count = values_x.length;

    // Calculate x statistics
    let sum_x = values_x.reduce((acc, val) => acc + val, 0);
    let mean_x = sum_x / count;
    
    let sampleVariance_x = values_x.reduce((acc, val) => acc + Math.pow(val - mean_x, 2), 0) / (count - 1);
    let populationVariance_x = values_x.reduce((acc, val) => acc + Math.pow(val - mean_x, 2), 0) / count;

    values_x.sort((a, b) => a - b);
    let median_x;
    if (count % 2 === 0) {
        median_x = (values_x[count / 2 - 1] + values_x[count / 2]) / 2;
    } else {
        median_x = values_x[Math.floor(count / 2)];
    }

    // Calculate y statistics
    let sum_y = values_y.reduce((acc, val) => acc + val, 0);
    let mean_y = sum_y / count;
    
    let sampleVariance_y = values_y.reduce((acc, val) => acc + Math.pow(val - mean_y, 2), 0) / (count - 1);
    let populationVariance_y = values_y.reduce((acc, val) => acc + Math.pow(val - mean_y, 2), 0) / count;

    values_y.sort((a, b) => a - b);
    let median_y;
    if (count % 2 === 0) {
        median_y = (values_y[count / 2 - 1] + values_y[count / 2]) / 2;
    } else {
        median_y = values_y[Math.floor(count / 2)];
    }

    // Calculate covariance and correlation
    let covariance = 0;
    for (let i = 0; i < count; i++) {
        covariance += (values_x[i] - mean_x) * (values_y[i] - mean_y);
    }
    covariance /= count;
    
    let correlation = (count * covariance) / (Math.sqrt(count * sampleVariance_x) * Math.sqrt(count * sampleVariance_y));

    let resultHtml = `
        <table>
            <thead>
                <tr>
                    <th>Statistic</th>
                    <th>X Values</th>
                    <th>Y Values</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of values</td>
                    <td>${count}</td>
                    <td>${count}</td>
                </tr>
                <tr>
                    <td>Sum</td>
                    <td>${sum_x}</td>
                    <td>${sum_y}</td>
                </tr>
                <tr>
                    <td>Mean</td>
                    <td>${mean_x.toFixed(2)}</td>
                    <td>${mean_y.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Sample Variance</td>
                    <td>${sampleVariance_x.toFixed(2)}</td>
                    <td>${sampleVariance_y.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Population Variance</td>
                    <td>${populationVariance_x.toFixed(2)}</td>
                    <td>${populationVariance_y.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Median</td>
                    <td>${median_x}</td>
                    <td>${median_y}</td>
                </tr>
                <tr>
                    <td>Covariance</td>
                    <td colspan="2">${covariance.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Correlation</td>
                    <td colspan="2">${correlation.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    document.getElementById('results').innerHTML = resultHtml;

    // Save values in cookie
    document.cookie = `values_x=${input_x}`;
    document.cookie = `values_y=${input_y}`;
}

document.getElementById('values_x').addEventListener('input', calculate);
document.getElementById('values_y').addEventListener('input', calculate);

// Check if there are previously saved values in the cookie
window.onload = function() {
    let cookies = document.cookie.split(';').map(cookie => cookie.trim());
    let input_x, input_y;
    for (let cookie of cookies) {
        if (cookie.startsWith('values_x=')) {
            input_x = cookie.substring('values_x='.length);
        } else if (cookie.startsWith('values_y=')) {
            input_y = cookie.substring('values_y='.length);
        }
    }
    if (input_x && input_y) {
        document.getElementById('values_x').value = input_x;
        document.getElementById('values_y').value = input_y;
        calculate();
    }
};
</script>