var express = require("express");
var app     = express();
var path    = require("path");
// Imports the Google Cloud client library
var Vision  = require('@google-cloud/vision');


app.get('/',function(req,res){
  console.log("Sending data");
  res.sendFile(__dirname + '/index.html');
  //__dirname : It will resolve to your project folder.
});

app.get('/recognize',function(req,res){
    console.log("Recognize");    
    // Instantiates a client
    const vision = Vision();
    // The path to the local image file, e.g. "/path/to/image.png"
    const fileName = '/home/srazin/Development/nodejs/1.jpg';

    // Performs label detection on the local file
    vision.labelDetection({ source: { filename: fileName } })
        .then((results) => {
            const labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => console.log(label));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    vision.logoDetection({ source: { filename: fileName } })
        .then((results) => {
            const logos = results[0].logoAnnotations;
            console.log('Logos:');
            logos.forEach((logo) => console.log(logo));
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });

    // Performs landmark detection on the local file
    vision.landmarkDetection({ source: {filename: fileName} })
        .then((results) => {
            const landmarks = results[0].landmarkAnnotations;
            console.log('Landmarks:');
            landmarks.forEach((landmark) => console.log(landmark));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    // Performs text detection on the local file
    vision.textDetection({ source: { filename: fileName } })
        .then((results) => {
            const detections = results[0].textAnnotations;
            console.log('Text:');
            detections.forEach((text) => console.log(text));
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });


});

app.get('/sitemap',function(req,res){
  res.sendFile('sitemap.html');
});

app.listen(3000);

console.log("Running at Port 3000");
