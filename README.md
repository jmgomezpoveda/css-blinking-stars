# css-blinking-stars
Some blinking stars in CSS3 with fallback option

Created by Jose Manuel Gómez Poveda for the <a href="nightearth.com">Night Earth</a> website.

To add stars to your website, just add the following lines to the head section:
```
<script src="blinkingstars.js"></script>
<link rel="stylesheet" type="text/css" href="blinkingstars.css">
```

And the following line at the beginning of the body section:
```
<div id="blinkingstars">&lt;/div>
```

You must include the following files in your project (or embed their content):
* blinkingstars.css
* blinkingstars.js

Optionally, if you want static stars in addition to the blinking ones, include the file "stars.png" as well, and use the "staticstars" ID in the div:
```
<div class="staticstars" id="blinkingstars"></div>
```

If you found this useful, please provide the corresponding attribution and/or link to this repository.