# Vision Api

### License Info

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project was started as a Science Fair project for Cross Roads Elementary School in Irmo, SC (https://www.lexrich5.org/cris) by Dan (http://dan.techdozor.org).
Main focus of this project is obtaining an image, feeding it to the Vision API, and retrieving the identified properties of the image as a result of recognition operation.
This project leverages node.js, Vision API from Google (possibly other providers), and even integrate with Alexa (see below). 

## What's needed:
- node.js
- export GOOGLE_APPLICATION_CREDENTIALS - pointing to json API Service Account https://cloud.google.com/vision/docs/auth. Note: have to go through motion of setting up the account, enabling the API, etc. etc. etc.
- don't forget to run **npm install**.

## Hot to use?
- First hit with your browser /upload URL (wherever you host this service)
- Upload your image (other files won't work)
- After call /results and see the results of the image recognition that today is based on Google Vision API and is able to recognize lables, text, labels.

## It is much better with Alexa
Power your Alexa to see: https://github.com/techdozor/alexvisionskill
