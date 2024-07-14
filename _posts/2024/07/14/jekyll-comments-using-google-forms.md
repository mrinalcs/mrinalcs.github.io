---
title: Jekyll comments using Google forms
description: Setup comments system in jekyll static sites using Google forms and fetching from Google Sheets using js
date: 2024-07-14
tags: [jekyll,web,tips]
redirect_from:
  - /add-comments-to-jekyll
---

There are lots way you can implement comments in Jekyll site [Discus](https://disqus.com/). If you are using [Github page](https://pages.github.com) there is lots of way you can implement like [Giscus](https://giscus.app/), [Utterances](https://utteranc.es/) . But they are either add supported or have to unnecessary login via  github. Here comments via google form and  Google Sheets can be used.

## Why google form

Along with above advantages you can see and modarate comments in one excel which very handy and also get notification of new comments. Moreover you have the data in one place. Another reason may be googls reliable fast server. 

## How it works 

You get comments via google form and Google Sheets helps to get comments of particular post by query for particular post url in `post_url` column.

Google Sheets API endpoint that retrieves data from a specific sheet in a Google Spreadsheet in CSV format.

```js
  const sheetId = 'YOUR_GOOGLE_SHEET_ID';
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  const postUrl = 'URL_OF_YOUR_POST';
  const query = `SELECT A, C, D, E WHERE B = '${postUrl}'`;
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=comments&tq=${encodeURIComponent(query)}&headers=0`;
```

## Setup google form and sheet

Heres How you can create a google form and connect with Google Sheets [Submit HTML form to Google Form](/submit-html-form-to-google-form)

Add fields to your form as you need. If you want anything optional in your comment section make that unchecked in google form required option unless it may redirect to form page saying fill required field.  

   - **Name** (Short answer)
   - **Email** (Short answer)
   - **Comment** (Paragraph)
   - **PostURL** (Short answer) 

Connect the Form to Google Sheets

After creating your form, go to the `"Responses"` tab.
Click on the Google Sheets icon to create a new sheet that will store the responses.
Now that the Google Form and Sheets setup is complete, you can add the form to your site.


## Add to site

Now you add the comments form to post pages

```html
<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeXElMhFkfRfFOMJIQgUJa0mi9lrNUExF04AN4BNsI3AsTpRw/formResponse" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="entry.2024848077" required><br><br>
  
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="entry.1580993660" required><br><br>
  
  <label for="comment">Comment:</label><br>
  <textarea id="comment" name="entry.1065046570" rows="4" cols="50"></textarea><br><br>
  
  <label for="posturl">Post URL:</label><br>
  <input type="text" id="posturl" name="entry.839337160"><br><br>
  
  <button type="submit">Submit</button>
</form>
```

```html
<div id="comments"></div>
<script>
    // Function to format the date and time from the data
    function formatDate(stringDate) {
        // Split the string into date and time parts
        const dateTimeParts = stringDate.split(' ');
        const datePart = dateTimeParts[0]; // Date part like "7/12/2024"
        let timePart = dateTimeParts[1]; // Time part like "23:32:54"

        // Parse hours, minutes, and seconds from the time part
        const [hours, minutes, seconds] = timePart.split(':');

        // Convert hours to 12-hour format and determine AM/PM
        let ampm = 'AM';
        let formattedHours = parseInt(hours, 10);
        if (formattedHours >= 12) {
            ampm = 'PM';
            if (formattedHours > 12) {
                formattedHours -= 12;
            }
        }
        if (formattedHours === 0) {
            formattedHours = 12; // 12 AM case
        }

        // Format time in HH:mm:ss AM/PM format
        timePart = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

        // Return the formatted date and time
        return `${datePart} at ${timePart}`;
    }

    // Get the current page URL
    const thisPageUrl = window.location.href;

    // Encode the SQL statement to be used in the URL
    const sqlStatement = encodeURIComponent(`SELECT A, C, D, E, F WHERE B = '${thisPageUrl}'`);

    // Construct the URL for fetching the data
    const csvUrl = `https://docs.google.com/spreadsheets/d/1hVRP9tYl8f4bsBjJP52hv74DwZ2pYpatxaNMG2rNY_M/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlStatement}&headers=0`;

    // Fetch the data from the Google Sheets URL
    fetch(csvUrl)
        .then(response => response.text()) // Get the response text (data)
        .then(csvText => {
            // Split the data into rows and then into individual cells
            const rows = csvText.trim().split('\n').map(row => row.split(','));

            // Get the container element for the comments
            const commentsContainer = document.getElementById('comments');

            // Loop through each row of the data
            rows.forEach(row => {
                const date = formatDate(row[0]); // Format the date and time
                const name = row[1]; // Get the name
                const comment = row[2]; // Get the comment
                const email = row[4]; // Get the email

                // Create a new div element for the comment
                const commentDiv = document.createElement('div');
                // Set the inner HTML of the div element
                commentDiv.innerHTML = `<strong><a href="mailto:${email}">${name}</a></strong> <em>${date}</em>: <p>${comment}</p>`;
                // Append the div element to the comments container
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors
</script>
```

With this setup, you can easily add and manage comments on your Jekyll site using Google Forms and Google Sheets.