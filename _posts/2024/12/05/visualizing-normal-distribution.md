---
title: "Visualizing Normal Distribution"
description: "An interactive visualization of the Normal Distribution, allowing users to adjust the mean and standard deviation to see how they affect the curve."
toc: false
date: 2024-12-05
image:  512242.png
tags: [stat]
---



The probability density function (PDF) of a normal distribution is given by:

$$
f(x|\mu, \sigma) = \frac{1}{\sigma \sqrt{2\pi}} \exp \left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
$$

where:
- $ \mu $ is the mean of the distribution,
- $ \sigma $ is the standard deviation,
- $ x $ is the variable

This function describes the likelihood of a random variable $ x $ falling at a particular value, based on the mean and standard deviation of the distribution.


<div class="normal-dist-container">
    <canvas id="normal-dist-canvas"></canvas>
    <div class="controls">
        <label>
            <span>Mean (\( \mu \)):</span>
            <input id="mean-slider" type="range" min="-10" max="10" value="0" step="0.1">
            <span id="mean-value">0</span>
        </label>
        <label>
            <span>Standard Deviation (\( \sigma \)):</span>
            <input id="stddev-slider" type="range" min="0.1" max="5" value="1" step="0.1">
            <span id="stddev-value">1</span>
        </label>
        <button id="reset-button">Reset</button>
    </div>
</div>

<style>
   

    .normal-dist-container { 
        margin: 0 auto;
        max-width: 100%;
        padding: 10px;
    }

    canvas {
        display: block;
        margin: 20px auto;
        /* border-radius: 10px;
        background: #ecf0f1;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); */
        max-width: 100%;
        height: auto;
    }

    .controls {
        margin: 20px auto;
    }

    label {
        display: block;
        margin: 10px auto;
        font-size: 18px;
    }

    input[type="range"] {
        width: 60%;
    }

    span {
        font-weight: bold;
    }

    button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background-color: #2980b9;
    }






    input[type="range"] { 
  -webkit-appearance: none;
  appearance: none;  
  width: 100%;
  cursor: pointer;
  outline: none; 
  overflow: hidden;
  border-radius: 16px;
} 
input[type="range"]::-webkit-slider-runnable-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}
 
input[type="range"]::-moz-range-track {
  height: 15px;
  background: #ccc;
  border-radius: 16px;
}
 
input[type="range"]::-webkit-slider-thumb { 
  -webkit-appearance: none;
  appearance: none;  
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #f50; 
  box-shadow: -407px 0 0 400px #f50;
}

 
input[type="range"]::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #f50; 
  box-shadow: -407px 0 0 400px #f50;
}

 
</style>

<script>
    const canvas = document.getElementById("normal-dist-canvas");
    const ctx = canvas.getContext("2d");

    const meanSlider = document.getElementById("mean-slider");
    const stddevSlider = document.getElementById("stddev-slider");
    const meanValue = document.getElementById("mean-value");
    const stddevValue = document.getElementById("stddev-value");
    const resetButton = document.getElementById("reset-button");

    let mean = parseFloat(meanSlider.value);
    let stddev = parseFloat(stddevSlider.value);

    const baselineStddev = 0.5;
    const baselineHeight = 0.7;

    const axisMargin = 50; // Margin for axis labels
    const gridSpacing = 50; // Spacing between grid lines
    const yAxisRange = 10; // Vertical range for numbers

    function resizeCanvas() {
        const containerWidth = document.querySelector(".normal-dist-container").clientWidth;
        canvas.width = containerWidth;
        canvas.height = containerWidth * 0.6;
        drawNormalDistribution();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function gaussian(x, mean, stddev) {
        const exponent = -((x - mean) ** 2) / (2 * stddev ** 2);
        return (1 / (stddev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    }

    function drawGrid() {
        ctx.beginPath();
        ctx.strokeStyle = "#BDC3C7";
        ctx.lineWidth = 0.5;

        // Draw vertical grid lines
        for (let x = axisMargin; x < canvas.width - axisMargin; x += gridSpacing) {
            ctx.moveTo(x, axisMargin);
            ctx.lineTo(x, canvas.height - axisMargin);
        }

        // Draw horizontal grid lines
        for (let y = axisMargin; y < canvas.height - axisMargin; y += gridSpacing) {
            ctx.moveTo(axisMargin, y);
            ctx.lineTo(canvas.width - axisMargin, y);
        }
        
        ctx.stroke();
    }

    function drawNormalDistribution() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();

        const maxY = gaussian(mean, mean, stddev);
        const scaleX = (canvas.width - 2 * axisMargin) / 20; // Scale for the X axis
        const scaleY = (canvas.height * baselineHeight * (baselineStddev / stddev)) / maxY; // Scale for the Y axis

        ctx.beginPath();
        ctx.moveTo(axisMargin, canvas.height - axisMargin);

        for (let x = -yAxisRange; x <= yAxisRange; x += 0.01) {
            const px = axisMargin + (x + yAxisRange) * scaleX; // Convert to pixel
            const py = canvas.height - axisMargin - gaussian(x, mean, stddev) * scaleY; // Convert to pixel

            ctx.lineTo(px, py);
        }

        ctx.lineTo(canvas.width - axisMargin, canvas.height - axisMargin);
        ctx.closePath();

        ctx.fillStyle = "#3498db";
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ts');
        ctx.lineWidth = 2;

        ctx.moveTo(axisMargin, canvas.height - axisMargin);
        ctx.lineTo(canvas.width - axisMargin, canvas.height - axisMargin);
        ctx.moveTo(canvas.width / 2, axisMargin);
        ctx.lineTo(canvas.width / 2, canvas.height - axisMargin);

        ctx.stroke();

        // Move the text to the top-right corner
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--t');
        ctx.font = "14px Arial";
        ctx.textAlign = "right";
        ctx.fillText("Mean (\u03BC): " + mean.toFixed(1), canvas.width - 10, 20);
        ctx.fillText("Standard Deviation (\u03C3): " + stddev.toFixed(1), canvas.width - 10, 40);

        // Draw axis numbers outside the grid
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--t');
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Draw X axis numbers
        for (let x = -yAxisRange; x <= yAxisRange; x++) {
            const px = axisMargin + (x + yAxisRange) * scaleX;
            ctx.fillText(x.toFixed(1), px, canvas.height - axisMargin + 20); // Position below the X axis
        }

        // Draw Y axis numbers
        for (let y = -yAxisRange; y <= yAxisRange; y++) {
            const py = canvas.height - axisMargin - y * gridSpacing;
            if (py >= axisMargin && py <= canvas.height - axisMargin) {
                ctx.fillText(y.toFixed(1), axisMargin - 20, py); // Position left of the Y axis
            }
        }
    }

    function updateVisualization() {
        mean = parseFloat(meanSlider.value);
        stddev = parseFloat(stddevSlider.value);

        meanValue.textContent = mean.toFixed(1);
        stddevValue.textContent = stddev.toFixed(1);

        drawNormalDistribution();
    }

    meanSlider.addEventListener("input", updateVisualization);
    stddevSlider.addEventListener("input", updateVisualization);

    resetButton.addEventListener("click", () => {
        meanSlider.value = "0";
        stddevSlider.value = "1";
        updateVisualization();
    });

    drawNormalDistribution();
</script>
