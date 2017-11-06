# Vision Api

### The MIT License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is a part of the Science Fair project for Cross Roads Elementary school. It leverages node.js as well as vision APIs from Google (possibly other providers) and can be used as an example of how such can be done. Main focus is obtaining an image, feeding it to the API, and retrieving the labels for the image as a result of recognition operation.

## What's needed:
- node.js
- export GOOGLE_APPLICATION_CREDENTIALS - pointing to json API Service Account https://cloud.google.com/vision/docs/auth. Note: have to go through motion of setting up the account, enabling the API, etc. etc. etc.

## Hot to use?
- First hit with your browser /upload URL (wherever you host this service)
- Upload your image (other files won't work)
- After call /results and see the results of the image recognition that today is based on Google Vision API and is able to recognize lables, text, labels.

Next step is to introudce Alexa skill. Stay tuned.
