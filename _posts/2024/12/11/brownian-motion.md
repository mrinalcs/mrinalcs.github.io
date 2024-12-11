---
title: "Brownian Motion"
description: "An interactive simulation of Brownian motion, demonstrating the random movement of particles. Adjust parameters like the number of particles, their size, and speed to observe different behaviors."
toc: false
date: 2024-12-11
image:  1112241.png
tags: [stat]
---

Brownian motion is the random movement of particles suspended in a fluid (liquid or gas). This phenomenon is named after the botanist Robert Brown, who observed the erratic movement of pollen grains in water in 1827.

<div class="brownian-motion-container">
    <canvas id="brownian-motion-canvas"></canvas>
    <div class="controls">
        <label>
            <span>Number of Particles:</span>
            <input id="particle-slider" type="range" min="1" max="200" value="50" step="1">
            <span id="particle-count">50</span>
        </label>
        <label>
            <span>Particle Size:</span>
            <input id="size-slider" type="range" min="2" max="10" value="5" step="1">
            <span id="size-value">5</span>
        </label>
        <label>
            <span>Particle Speed:</span>
            <input id="speed-slider" type="range" min="0.1" max="10" value="1" step="0.1">
            <span id="speed-value">1.0</span>
        </label>
        <label>
            <span>Keep Speed Constant:</span>
            <input id="keep-speed-toggle" type="checkbox" checked>
        </label>
        <button id="reset-button">Reset</button>
    </div>
</div>

<style>
    .brownian-motion-container {
        margin: 0 auto;
        max-width: 100%;
        padding: 10px;
    }

    canvas {
        display: block;
        margin: 20px auto;
        border: 1px solid #bdc3c7;
        max-width: 100%;
        height: auto;
    }

    .controls {
        margin: 20px auto;
        text-align: center;
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
</style>

<script>
    const canvas = document.getElementById("brownian-motion-canvas");
    const ctx = canvas.getContext("2d");

    const particleSlider = document.getElementById("particle-slider");
    const sizeSlider = document.getElementById("size-slider");
    const speedSlider = document.getElementById("speed-slider");
    const keepSpeedToggle = document.getElementById("keep-speed-toggle");
    const particleCount = document.getElementById("particle-count");
    const sizeValue = document.getElementById("size-value");
    const speedValue = document.getElementById("speed-value");
    const resetButton = document.getElementById("reset-button");

    let particles = [];
    let numParticles = parseInt(particleSlider.value);
    let particleSize = parseInt(sizeSlider.value);
    let speed = parseFloat(speedSlider.value);
    let keepSpeedConstant = keepSpeedToggle.checked;

    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.6;
        createParticles();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function createParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * speed,
                dy: (Math.random() - 0.5) * speed,
                size: particleSize,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            });
        }
    }

    function checkCollisions() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - particles[i].x;
                const dy = particles[j].y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particles[i].size + particles[j].size) {
                    // Reflect velocities
                    const tempDx = particles[i].dx;
                    const tempDy = particles[i].dy;

                    particles[i].dx = particles[j].dx;
                    particles[i].dy = particles[j].dy;

                    particles[j].dx = tempDx;
                    particles[j].dy = tempDy;

                    // Ensure constant speed if toggle is enabled
                    if (keepSpeedConstant) {
                        const speedI = Math.sqrt(particles[i].dx ** 2 + particles[i].dy ** 2);
                        const speedJ = Math.sqrt(particles[j].dx ** 2 + particles[j].dy ** 2);

                        particles[i].dx *= speed / speedI;
                        particles[i].dy *= speed / speedI;

                        particles[j].dx *= speed / speedJ;
                        particles[j].dy *= speed / speedJ;
                    }
                }
            }
        }
    }

    function updateParticles() {
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            // Reflect off canvas boundaries
            if (p.x <= p.size || p.x >= canvas.width - p.size) p.dx *= -1;
            if (p.y <= p.size || p.y >= canvas.height - p.size) p.dy *= -1;
        });

        checkCollisions();
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.closePath();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    function updateVisualization() {
        numParticles = parseInt(particleSlider.value);
        particleSize = parseInt(sizeSlider.value);
        speed = parseFloat(speedSlider.value);
        keepSpeedConstant = keepSpeedToggle.checked;

        particleCount.textContent = numParticles;
        sizeValue.textContent = particleSize;
        speedValue.textContent = speed.toFixed(1);

        createParticles();
    }

    resetButton.addEventListener("click", () => {
        particleSlider.value = "50";
        sizeSlider.value = "5";
        speedSlider.value = "1";
        keepSpeedToggle.checked = true;
        updateVisualization();
    });

    particleSlider.addEventListener("input", updateVisualization);
    sizeSlider.addEventListener("input", updateVisualization);
    speedSlider.addEventListener("input", updateVisualization);
    keepSpeedToggle.addEventListener("change", updateVisualization);

    createParticles();
    animate();
</script>
