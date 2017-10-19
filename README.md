# Vision Api

This project is a part of the Science Fair project for Cross Roads Elementary school. It leverages node.js as well as vision APIs from Google (possibly other providers) and can be used as an example of how such can be done. Main focus is obtaining an image, feeding it to the API, and retrieving the labels for the image as a result of recognition operation.

What's needed:
- node.js
- export GOOGLE_APPLICATION_CREDENTIALS - pointing to json API Service Account https://cloud.google.com/vision/docs/auth. Note: have to go through motion of setting up the account, enabling the API, etc. etc. etc.
