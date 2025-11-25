---  
title: "Progress Bars In Python"
date: 2025-11-25 
last_modified_at: 2025-11-25 
tags: [python]  
---

<div style="padding:10px;font-family:ui-monospace,Menlo,monospace;border: solid 1px;border-radius:10px;line-height:1.4;">
  
  <label>Select Progress Bar: </label>
  <select id="barType" style="padding:5px;border-radius:6px;margin-right:10px;">
    <option value="tqdm">tqdm</option>
    <option value="rich">rich</option>
    <option value="alive">alive_progress</option>
    <option value="pb2">progressbar2</option>
  </select>

  <button id="resetBtn" style="padding:5px 12px;border-radius:6px;border:0;background:#444;color:#fff;cursor:pointer;">
    Reset
  </button>

  <pre id="out" style="padding:0;border:none;margin-top:15px;font-size:15px;white-space:pre;"></pre>

  <script>
    (function(){
      const out = document.getElementById("out");
      const barType = document.getElementById("barType");
      const resetBtn = document.getElementById("resetBtn");

      let timer = null;

      function fmt(sec){
        const m = String(Math.floor(sec/60)).padStart(2,"0");
        const s = String(Math.floor(sec%60)).padStart(2,"0");
        return `${m}:${s}`;
      }

      function startBar(){
        clearInterval(timer);
        out.textContent = "";

        const t = barType.value;
        const total = 100;
        let i = 0;
        let start = performance.now();

        timer = setInterval(()=>{
          i++;
          const now = performance.now();
          const elapsed = (now - start)/1000;
          const speed = i/elapsed;
          const remain = total - i;
          const eta = remain/speed;

          // ---- tqdm ----
          if(t === "tqdm"){
            const blocks = 10;
            const p = Math.round((i/total)*100);
            const f = Math.round((p/100)*blocks);
            out.textContent =
              `${p}%|${"█".repeat(f)}${"░".repeat(blocks-f)}| ${i}/${total} `
              + `[${fmt(elapsed)}<${fmt(eta)}, ${speed.toFixed(2)}it/s]`;
          }

          // ---- rich ----
          if(t === "rich"){
            const barWidth = 30;
            const done = Math.round((i/total)*barWidth);
            out.textContent =
              `Processing…\n[${"█".repeat(done)}${" ".repeat(barWidth-done)}] `
              + `${Math.round((i/total)*100)}%`;
          }

          // ---- alive_progress ----
          if(t === "alive"){
            const spinners = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
            const s = spinners[i % spinners.length];
            const w = 20;
            const fill = Math.round((i/total)*w);
            out.textContent =
              `${s} |${"█".repeat(fill)}${" ".repeat(w-fill)}| ${i}/${total}`;
          }

          // ---- progressbar2 ----
          if(t === "pb2"){
            const full = 40;
            const done = Math.round((i/total)*full);
            out.textContent =
              `[${"=".repeat(done)}${" ".repeat(full-done)}] ${i}%`;
          }

          if(i >= total){
            clearInterval(timer);

            if(t === "tqdm")
              out.textContent = "100%|██████████| 100/100 [00:05<00:00, 19.53it/s]";
            if(t === "rich")
              out.textContent += "\n✓ Completed";
            if(t === "alive")
              out.textContent += "\n✔ done";
            if(t === "pb2")
              out.textContent = "[========================================] 100%";
          }

        }, 50);
      }

      resetBtn.onclick = startBar;
      barType.onchange = startBar;

      // ---- Start with tqdm only ----
      barType.value = "tqdm";
      startBar();

    })();
  </script>

</div>

rich not replicated i know. going to update