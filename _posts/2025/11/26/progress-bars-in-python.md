---
title: "Progress Bars In Python"
date: 2025-11-25
last_modified_at: 2025-11-25
tags: [python]
---

<div style="padding:10px;font-family:ui-monospace,Menlo,monospace;border:solid 1px var(--hs);border-radius:8px;line-height:1.4;">
  
  <label>Select Progress Bar: </label>
  <select id="barType" style="padding:5px;border-radius:6px;margin-right:10px;border:solid 1px var(--hs)">
    <option value="tqdm">tqdm</option>
    <option value="rich">rich</option>
    <option value="alive">alive_progress</option>
    <option value="pb2">progressbar2</option>
  </select>

  <button id="resetBtn" style="padding:5px 12px;border-radius:6px;border:0;background:#444;color:#fff;cursor:pointer;">
    Reset
  </button>

  <button id="pauseBtn" style="padding:5px 12px;border-radius:6px;border:0;background:#444;color:#fff;cursor:pointer;margin-left:10px;">
    Pause
  </button>

  <pre id="out" style="padding:10px;border:none;margin-top:15px;font-size:15px;white-space:pre;"></pre>

  <script>
    (function(){
      const out = document.getElementById("out");
      const barType = document.getElementById("barType");
      const resetBtn = document.getElementById("resetBtn");
      const pauseBtn = document.getElementById("pauseBtn");

      let timer = null;
      let paused = false;
      let i = 0;
      let start = 0;

      function fmt(sec){
        const m = String(Math.floor(sec/60)).padStart(2,"0");
        const s = String(Math.floor(sec%60)).padStart(2,"0");
        return `${m}:${s}`;
      }

      function startBar(){
        clearInterval(timer);
        paused = false;
        pauseBtn.textContent = "Pause";
        out.textContent = "";

        const t = barType.value;
        const total = 100;
        i = 0;
        start = performance.now();

        timer = setInterval(()=>{
          if (paused) return;

          i++;
          const now = performance.now();
          const elapsed = (now - start)/1000;
          const speed = i/elapsed;
          const remain = total - i;
          const eta = remain/speed;

          /* tqdm */
          if(t === "tqdm"){
            const blocks = 10;
            const p = Math.round((i/100)*100);
            const f = Math.round((p/100)*blocks);
            out.textContent =
              `${p}%|${"█".repeat(f)}${"░".repeat(blocks-f)}| ${i}/100 ` +
              `[${fmt(elapsed)}<${fmt(eta)}, ${speed.toFixed(2)}it/s]`;
          }

          /* rich */
          if (t === "rich") {
            const percent = i / 100;
            const pctStr = String(Math.round(percent * 100)).padStart(3);

            const width = 34;
            const exact = percent * width;
            const full = Math.floor(exact);
            const remainder = Math.floor((exact - full) * 8);

            const remChar = remainder > 0 ? "╺" : "";

            const bar =
              "━".repeat(full) +
              remChar +
              " ".repeat(width - full - (remChar ? 1 : 0));

            const iStr = String(i).padStart(3);

            out.textContent =
              ` ${pctStr}% ${bar}  ${iStr}/100 • ${fmt(elapsed)} • ${fmt(eta)}`;
          }

          /* alive */
          if(t === "alive"){
            const spinners = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
            const s = spinners[i % spinners.length];
            const w = 20;
            const fill = Math.round((i/100)*w);
            out.textContent =
              `${s} |${"█".repeat(fill)}${" ".repeat(w-fill)}| ${i}/100`;
          }

          /* pb2 */
          if(t === "pb2"){
            const full = 40;
            const done = Math.round((i/100)*full);
            out.textContent =
              `[${"=".repeat(done)}${" ".repeat(full-done)}] ${i}%`;
          }

          /* end */
          if(i >= 100){
            clearInterval(timer);

            if(t === "tqdm")
              out.textContent = "100%|██████████| 100/100 [00:05<00:00, 19.53it/s]";

            if(t === "rich")
              out.textContent += `\n ✔ Completed`;

            if(t === "alive")
              out.textContent += `\n ✔ done`;

            if(t === "pb2")
              out.textContent = `[${"=".repeat(40)}] 100%`;
          }

        }, 50);
      }

      /* play/pause */
      pauseBtn.onclick = ()=>{
        if(paused){
          paused = false;
          pauseBtn.textContent = "Pause";
        } else {
          paused = true;
          pauseBtn.textContent = "Play";
        }
      };

      resetBtn.onclick = startBar;
      barType.onchange = startBar;

      barType.value = "tqdm";
      startBar();
    })();
  </script>

</div>
