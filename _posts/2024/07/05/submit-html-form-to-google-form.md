---
title: Submit HTML form to Google Form
description: "How to submit HTML forms to Google Forms and Google Sheets"
date: 2024-07-05  
tags: [web,tips]
---

Here, we'll explore how to create a simple HTML form and submit its data to Google Sheets using Google Forms. This may be helpfull to get submission in a static site. This page also you will find a form where you can drop something :) [go](#formContainer).

 

## Create a Google Form:

Go to [Google Forms](https://docs.google.com/forms) and create a new form.
Add the necessary fields (e.g., name, email) to your form.

![Google for test form creat](Annotation%202024-07-05%20100625.jpg)

Send this google form via [link](https://docs.google.com/forms/d/e/1FAIpQLSeXElMhFkfRfFOMJIQgUJa0mi9lrNUExF04AN4BNsI3AsTpRw/viewform?usp=sf_link) and copy that link.

![Google form share link page](Annotation%202024-07-05%20100806.jpg)


## Get HTML Form

Create an HTML  form that will send data to our Google Form.

## By Inspecting form page

```html
<form action="YOUR_GOOGLE_FORM_URL" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="entry.1234567890" required><br><br>
  
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="entry.0987654321" required><br><br>
   
  <button type="submit">Submit</button>
</form>
```

Get  `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeXElMhFkfRfFOMJIQgUJa0mi9lrNUExF04AN4BNsI3AsTpRw/formResponse` 

and add name attribute values which you can get from  `FB_PUBLIC_LOAD_DATA` by inspecting the page

![get response url rfom inspecting the page](Annotation%202024-07-05%20104401.jpg)

```html
<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeXElMhFkfRfFOMJIQgUJa0mi9lrNUExF04AN4BNsI3AsTpRw/formResponse" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="entry.2024848077" required><br><br>
  
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="entry.1580993660" required><br><br>
   
  <button type="submit">Submit</button>
</form>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/mrinalcs/embed/bGPbYJb?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/mrinalcs/pen/bGPbYJb">
  Untitled</a> by Mrinal (<a href="https://codepen.io/mrinalcs">@mrinalcs</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

There is a existing site that does this in snap. 


### Using Google Forms HTML Exporter

Go to [Google Forms HTML Exporter](https://stefano.brilli.me/google-forms-html-exporter/) and paste the link you copied. `Get the html` you get html code of the form and output , you can fill the form here to check form is working.

![snap from Google Forms HTML Exporter get the html](Annotation%202024-07-05%20101122.jpg)

## Google Form responses

Open google form response tab to see responses submited.

![Google form responses page](Annotation%202024-07-05%20101305.jpg)

## Google Sheet responses


Now you can creat a **Google Sheet** 
 
![google sheet creat from google form](Annotation%202024-07-05%20101803.jpg)

Now when new submission will be done this sheet will be automatically updated.

![google sheet of responses](Annotation%202024-07-05%20103354.jpg)
 

You have now successfully set up an HTML form that submits data to Google Sheets via Google Forms. This method is straightforward and integrates  with Google's ecosystem, offering a convenient way to manage and analyze form submissions. 


To add this form submission to a jekyll site.