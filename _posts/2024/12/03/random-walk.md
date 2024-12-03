---
title: "Random walk"
description: "Random walk process and its simulation and visualise it using JavaScript and HTML canvas"
date: "2024-12-03"
tags: ["stat"]
image: "312241.png"
toc: false
---

## What is a Random Walk?

A **random walk** is a mathematical process that describes a path consisting of a series of random steps. Each step's direction is determined randomly, making the trajectory unpredictable. The concept is simple yet powerful, with applications ranging from physics and biology to economics and computer science.

In the simplest form of a random walk in two dimensions:
1. A point starts at a specific location.
2. It moves in one of four directions (up, down, left, or right), chosen randomly.
3. This process repeats indefinitely or until a certain condition is met.

## Simulating a Random Walk

The following simulation shows how a random walk can be visualized in a 2D space using a **canvas** element in HTML. 


<div class="random-walk-container">
    <canvas id="rw-canvas"></canvas>
    <div class="rw-controls">
        <button id="rw-start-btn">Start Simulation</button>
        <button id="rw-clear-btn">Clear Canvas</button>
        <label>
            <span>Style:</span>
            <select id="rw-style-selector">
                <option value="point">Point</option>
                <option value="line">Line</option>
            </select>
        </label>
        <label>
            <span>Speed:</span>
            <input id="rw-speed-control" type="range" min="1" max="100" value="50">
        </label>
    </div>
</div>

<style>
    .random-walk-container {
        text-align: center;
        width: 90%;  
        max-width: 1000px; 
        margin: 30px 0;
    }
    canvas {
        border: 3px solid #2d3436;
        border-radius: 10px;
        background: radial-gradient(circle, #dfe6e9, #b2bec3);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        width: 100%;
        height: auto; /* Maintain aspect ratio */
    }
    .rw-controls {
        margin-top: 20px;
    }
    button, select, input {
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    button {
        background: #0984e3;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    button:hover {
        background: #74b9ff;
        transform: scale(1.05);
    }
    button:active {
        background: #40739e;
        transform: scale(0.95);
    }
    select, input[type="range"] {
        background: #dfe6e9;
        color: #2d3436;
        border: 1px solid #2d3436;
    }
    label span {
        margin-right: 5px;
        font-weight: bold;
    }
</style>

<script>
    const canvasElement = document.getElementById('rw-canvas');
    const canvasContext = canvasElement.getContext('2d');
    const startBtn = document.getElementById('rw-start-btn');
    const clearBtn = document.getElementById('rw-clear-btn');
    const styleSelector = document.getElementById('rw-style-selector');
    const speedControl = document.getElementById('rw-speed-control');

    //  adjust canvas size based on parent div here main
    function adjustCanvasSize() {
        const parentWidth = canvasElement.parentElement.clientWidth;  
        canvasElement.width = parentWidth;
        canvasElement.height = parentWidth * 0.6;  
    }

    window.addEventListener('resize', adjustCanvasSize); // adjust on window resize
    adjustCanvasSize(); // set initial 

    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    let currentX = canvasWidth / 2;
    let currentY = canvasHeight / 2;
    let previousX = currentX;
    let previousY = currentY;
    let isRunning = false;
    let simulationSpeed = 50;
    let simulationTimer;

    function drawPoint(x, y) {
        canvasContext.fillStyle = 'rgba(0, 122, 255, 0.8)';
        canvasContext.beginPath();
        canvasContext.arc(x, y, 3, 0, Math.PI * 2);
        canvasContext.fill();
    }

    function drawLine(x1, y1, x2, y2) {
        canvasContext.strokeStyle = 'rgba(0, 122, 255, 0.8)';
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();
        canvasContext.moveTo(x1, y1);
        canvasContext.lineTo(x2, y2);
        canvasContext.stroke();
    }

    function randomWalkStep() {
        const stepSize = 5;
        const direction = Math.floor(Math.random() * 4);

        previousX = currentX;
        previousY = currentY;

        switch (direction) {
            case 0: currentX += stepSize; break; //   right
            case 1: currentX -= stepSize; break; //   left
            case 2: currentY += stepSize; break; //  down
            case 3: currentY -= stepSize; break; //  up
        }

        // Ensure the point stays within bounds
        currentX = Math.max(0, Math.min(canvasWidth, currentX));
        currentY = Math.max(0, Math.min(canvasHeight, currentY));

        if (styleSelector.value === 'point') {
            drawPoint(currentX, currentY);
        } else if (styleSelector.value === 'line') {
            drawLine(previousX, previousY, currentX, currentY);
        }
    }

    function startSimulation() {
        isRunning = true;
        currentX = canvasWidth / 2; 
        currentY = canvasHeight / 2; 
        previousX = currentX;
        previousY = currentY;

        function step() {
            if (isRunning) {
                randomWalkStep();
                simulationTimer = setTimeout(step, 100 - simulationSpeed);
            }
        }

        step();
    }

    function stopSimulation() {
        isRunning = false;
        clearTimeout(simulationTimer);
        startBtn.textContent = 'Start Simulation';
    }

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            startBtn.textContent = 'Stop Simulation';
            startSimulation();
        } else {
            stopSimulation();
        }
    });

    clearBtn.addEventListener('click', () => {
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        stopSimulation(); // Stop simulation, clearing
    });

    speedControl.addEventListener('input', (e) => {
        simulationSpeed = e.target.value;
    });
</script>
