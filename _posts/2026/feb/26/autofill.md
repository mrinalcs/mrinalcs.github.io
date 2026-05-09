--- 
title: "AutoFill: Scan to Fill Forms"
description: "Using camera-based AI and document understanding to automatically fill online forms."
image: "10526.jpg"
date: "2026-02-26"
tags: ["image-processing", "automation"]
---

Have you ever filled out a form where you had to manually enter marks for every subject from a marksheet?  
Or type a long roll number carefully without making mistakes?

It is cumbersome and time-consuming.

Many websites still require this kind of manual entry. The process feels outdated and inefficient. What if we could automatically fill forms simply by scanning our documents? That would be much more hassle-free.

Recently, many recruitment websites have resume upload with autofill. You upload your CV, and the system tries to extract text from the PDF to populate the fields. This is a good. Similarly we can do for formfillig but in many cases we have documents in image format so in such senarious we can implement ocr and fill. Here new problems arises like multi language, LLM confusion if multiple name. 

Anyway we can achive this by selecting section... But it can be implemented. I was trying to implement this but till now can not catch it up.  so just pushing this post if later comes opportunity I will..

<style>

/* AutoFill OCR Scoped Variables */

:root {

  --afx-bg: #ffffff;
  --afx-bg-soft: #ebebeb;
  --afx-bg-tertiary: #ebebeb;

  --afx-text: #000000;
  --afx-text-soft: #6b6b6b;
  --afx-text-light: #4d4d4d;
  --afx-text-caption: #444444;

  --afx-border: #e5e5e5;

  --afx-hover: rgb(134 134 134 / 50%);
  --afx-hover-soft: #eeeeee;

  --afx-accent: #a5ea20;

  --afx-border-width: 1.5px;
  --afx-radius: 14px;

  --afx-primary-blue: #007bff;
  --afx-success-green: #4CAF50;

  --afx-shadow:
    0 10px 25px rgba(0, 0, 0, 0.05);
}

/* Dark Mode */

@media (prefers-color-scheme: dark) {

  :root {

    --afx-bg: rgb(31, 31, 31);
    --afx-bg-soft: #171717;
    --afx-bg-tertiary: #383838;

    --afx-text: #ffffff;
    --afx-text-soft: #989898;
    --afx-text-light: #a3a3a3;
    --afx-text-caption: #bdbdbd;

    --afx-border: #2b2b2b;

    --afx-hover: rgba(238, 238, 238, 0.5);
    --afx-hover-soft: #383838;

    --afx-accent: #a5ea20;
  }
}

/* Base Layout */

.afx-wrapper * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.afx-wrapper {
 

  display: flex;
  justify-content: center;
  align-items: center;
 

  color: var(--afx-text);
}

.afx-container {

  width: 100%;
  max-width: 1000px;
 
 
}

.afx-header {

  display: flex;
  justify-content: space-between;
  align-items: center;

  justify-content: center;
    align-items: center;
    margin:24px;
    padding:10px;

   margin-top: 100px;
}

.afx-title {

  font-size: 1.2rem;
  font-weight: 700;
}

.afx-main {

  display: flex;
  flex-direction: column;

  gap: 24px;
}

@media (min-width: 768px) {

  .afx-main {

    flex-direction: row;
    align-items: stretch;
  }

  .afx-divider {

    width: 1px;

    /* background: var(--afx-border); */

    margin: 0 10px;
  }
}

.afx-section {

  flex: 1;

  display: flex;
  flex-direction: column;
}

.afx-section-title {

  text-align: center;

  font-size: 1.1rem;
  font-weight: 600;

  margin-bottom: 16px;
}

/* Upload Card */

.afx-upload-card {

  position: relative;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 40px 20px;

  background: var(--afx-bg);

  border:
    2px dashed
    var(--afx-border);

  border-radius: var(--afx-radius);

  transition: all 0.3s ease;
}

.afx-upload-card.afx-drag-over {

  border-color: var(--afx-primary-blue);

  background: rgba(0, 123, 255, 0.08);

  transform: scale(1.02);
}

.afx-upload-text {

  font-weight: 600;

  margin-bottom: 14px;
}

/* Loader */

.afx-loader {

  position: absolute;
  inset: 0;

  display: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.82);

  border-radius: var(--afx-radius);

  z-index: 10;
}

.afx-loader-text {

  font-size: 15px;
  font-weight: 600;
}

/* Form */

.afx-form-card {

  background: var(--afx-bg);

  border:
    var(--afx-border-width)
    solid
    var(--afx-border);

  border-radius: var(--afx-radius);

  padding: 20px;
}

.afx-form-group {

  margin-bottom: 16px;
}

.afx-label {

  display: block;

  margin-bottom: 6px;

  font-size: 0.85rem;
  font-weight: 600;

  color: var(--afx-text-light);
}

.afx-input {

  width: 100%;

  padding: 12px;

  border-radius: 8px;

  border:
    var(--afx-border-width)
    solid
    var(--afx-border);

  background: var(--afx-bg-soft);

  color: var(--afx-text);

  font-size: 0.95rem;

  transition: all 0.2s ease;
}

.afx-input:focus {

  outline: none;

  border-color: var(--afx-primary-blue);

  background: var(--afx-bg);
}

/* Buttons */

.afx-btn {

  width: 100%;

  padding: 14px;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  font-weight: 700;

  transition: all 0.2s ease;
}

.afx-btn:hover {

  opacity: 0.94;
}

.afx-btn-primary {

  background: var(--afx-primary-blue);

  color: #ffffff;
}

.afx-btn-dark {

  background: #2d3748;

  color: #ffffff;
}

/* Status */

.afx-status {

  margin-top: 10px;

  font-size: 0.82rem;

  color: var(--afx-primary-blue);

  text-align: center;
}

.afx-status-success {

  color: var(--afx-success-green);
}

.afx-status-error {

  color: #ff4d4f;
}
i.icon-doc.afx-upload-doc {
    padding: 20px;
}
</style>

<div class="afx-wrapper">

  <div class="afx-container">

    <!-- Header -->
    <header class="afx-header">

      <div class="afx-title">
        Demo
      </div>

    </header>

    <!-- Main -->
    <main class="afx-main">

      <!-- Upload Section -->
      <section class="afx-section">

        <h2 class="afx-section-title">
          Drop Marksheet Here
        </h2>

        <div
          class="afx-upload-card"
          id="afxDropZone"
        >

          <div
            class="afx-loader"
            id="afxLoader"
          >

            <p class="afx-loader-text">
              Scanning Document...
            </p>

          </div>
<i class="icon-doc afx-upload-doc"></i>
          <p class="afx-upload-text">
            Drag & Drop or Click to Upload
          </p>

          <input
            type="file"
            id="afxFileInput"
            hidden
            accept="image/*,application/pdf"
          />

          <button
            class="afx-btn afx-btn-primary"
            style="margin: 15px 0;"
            onclick="document.getElementById('afxFileInput').click()"
          >
            Select File
          </button>

          <p
            class="afx-status"
            id="afxStatus"
          ></p>

        </div>

      </section>

      <!-- Divider -->
      <div class="afx-divider"></div>

      <!-- Form Section -->
      <section class="afx-section">

        <h2 class="afx-section-title">
          Extracted Data
        </h2>

        <div class="afx-form-card">

          <form id="afxForm">

            <div class="afx-form-group">

              <label class="afx-label">
                Candidate Name
              </label>

              <input
                type="text"
                id="afxName"
                class="afx-input"
                placeholder="Name"
              />

            </div>

            <div class="afx-form-group">

              <label class="afx-label">
                Roll Number
              </label>

              <input
                type="text"
                id="afxRoll"
                class="afx-input"
                placeholder="Roll Number"
              />

            </div>

            <div class="afx-form-group">

              <label class="afx-label">
                Aggregate Percentage
              </label>

              <input
                type="text"
                id="afxMarks"
                class="afx-input"
                placeholder="Percentage"
              />

            </div>

            <button
              type="submit"
              class="afx-btn afx-btn-dark"
            >
              Confirm & Save
            </button>

          </form>

        </div>

      </section>

    </main>

  </div>

</div>

<script>

/* Elements */

const afxDropZone =
  document.getElementById('afxDropZone');

const afxFileInput =
  document.getElementById('afxFileInput');

const afxLoader =
  document.getElementById('afxLoader');

const afxStatus =
  document.getElementById('afxStatus');

/* API */

const AFX_API_URL =
  'https://ocr.mrinalcs.workers.dev';

/* Prevent Default Drag Behaviors */

[
  'dragenter',
  'dragover',
  'dragleave',
  'drop'
].forEach(eventName => {

  afxDropZone.addEventListener(
    eventName,
    (e) => {

      e.preventDefault();
      e.stopPropagation();
    }
  );

});

/* Drag UI */

afxDropZone.addEventListener(
  'dragover',
  () => {

    afxDropZone.classList.add(
      'afx-drag-over'
    );
  }
);

afxDropZone.addEventListener(
  'dragleave',
  () => {

    afxDropZone.classList.remove(
      'afx-drag-over'
    );
  }
);

/* Drop Upload */

afxDropZone.addEventListener(
  'drop',
  (e) => {

    afxDropZone.classList.remove(
      'afx-drag-over'
    );

    const file =
      e.dataTransfer.files[0];

    afxHandleUpload(file);
  }
);

/* File Input Upload */

afxFileInput.addEventListener(
  'change',
  (e) => {

    afxHandleUpload(
      e.target.files[0]
    );
  }
);

/* Upload Handler */

async function afxHandleUpload(file) {

  if (!file) return;

  afxLoader.style.display = 'flex';

  afxStatus.className =
    'afx-status';

  afxStatus.innerText =
    `Processing: ${file.name}`;

  const formData =
    new FormData();

  formData.append(
    'file',
    file
  );

  try {

    const response =
      await fetch(
        AFX_API_URL,
        {
          method: 'POST',
          body: formData
        }
      );

    if (!response.ok) {

      throw new Error(
        'OCR Failed'
      );
    }

    const data =
      await response.json();

    document.getElementById(
      'afxName'
    ).value =
      data.name || '';

    document.getElementById(
      'afxRoll'
    ).value =
      data.roll_number || '';

    document.getElementById(
      'afxMarks'
    ).value =
      data.percentage || '';

    afxStatus.className =
      'afx-status afx-status-success';

    afxStatus.innerText =
      'Scan Successful!';

  } catch (error) {

    console.error(error);

    afxStatus.className =
      'afx-status afx-status-error';

    afxStatus.innerText =
      'Error: Could not extract data.';
  }

  finally {

    afxLoader.style.display =
      'none';
  }
}

</script> 