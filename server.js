var express = require("express");
var app     = express();
var path    = require("path");
var multer  = require('multer');
// Imports the Google Cloud client library
var Vision  = require('@google-cloud/vision');
var fs = require('fs');
var data1 = "";
var fileToRecognize = "/uploads/image.jpg";

var upload = multer({ dest: 'uploads/' });

//POST operation from upload html to upload and recognize the image
app.post( '/upload-target', upload.single('file'), function(req,res){ 
    console.log("upload file "+req.file.path + " " + req.file.filename);
    fs.readFile(req.file.path, function (err, data) {
          var newPath = __dirname + fileToRecognize;
          fs.writeFile(newPath, data, function (err) {
        });
    });

    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log("successfully deleted " + req.file.path);
    });

    recognize(fileToRecognize, function(err, result) {
        if(err) {
            console.log("Error occured recognizing the image");
        } else {
            console.log("Recognition was successful");
        }
    });
    res.status( 200 ).send( req.file );
});


//Image recognition function
function recognize(fileSubPath) {
    console.log("Calling recognize with: " + fileSubPath);
    var fileName = __dirname + fileSubPath;
    console.log("Full path for recognition: " + fileName);
    data1 = "";
    console.log(data1 + "\n");

    // Instantiates a client
    const vision = Vision();

    // Performs label detection on the local file
    vision.labelDetection({ source: { filename: fileName } })
        .then((results) => {
            const labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => data1 += JSON.stringify(label.description) + "\n");
            //console.log(data);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    vision.logoDetection({ source: { filename: fileName } })
        .then((results) => {
            const logos = results[0].logoAnnotations;
            console.log('Logos:');
            logos.forEach((logo) => data1 += JSON.stringify(logo.description) + "\n");
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });

    // Performs landmark detection on the local file
    vision.landmarkDetection({ source: {filename: fileName} })
        .then((results) => {
            const landmarks = results[0].landmarkAnnotations;
            console.log('Landmarks:');
            landmarks.forEach((landmark) => data1 += JSON.stringify(landmark.description) + "\n");
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    // Performs text detection on the local file
    vision.textDetection({ source: { filename: fileName } })
        .then((results) => {
            const detections = results[0].textAnnotations;
            console.log('Text:');
            detections.forEach((label) => data1 += JSON.stringify(text.description) + "\n");
            //console.log("Recognition result: \n" + data);
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });

    return;
}

//Render upload.html
app.get('/upload',function(req,res){
    console.log("Upload file"); 
    res.sendFile(__dirname + '/upload.html');
});

//Render dropzone.css
app.get('/dropzone.css',function(req,res){
    res.sendFile(__dirname + '/dropzone.css');
});

//Render dropzone.js
app.get('/dropzone.js',function(req,res){
    res.sendFile(__dirname + '/dropzone.js');
});

//Provide the results of recognition
app.get('/result',function(req,res){
    console.log(data1);
    res.send(data1.replace(/['"]+/g, ''));
});

//Test regonizer api
app.get('/recognize',function(req, res){
    console.log("Recognize");  
    //var data = "test";
    data1 = "";
    console.log(data1 + "\n");

    // Instantiates a client
    const vision = Vision();
    // The path to the local image file, e.g. "/path/to/image.png"
    const fileName = __dirname + '/2.jpg';
    console.log(filename);

    // Performs label detection on the local file
    vision.labelDetection({ source: { filename: fileName } })
        .then((results) => {
            const labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => data1 += JSON.stringify(label.description) + "\n");
            //console.log(data);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    vision.logoDetection({ source: { filename: fileName } })
        .then((results) => {
            const logos = results[0].logoAnnotations;
            console.log('Logos:');
            logos.forEach((logo) => data1 += JSON.stringify(logo.description) + "\n");
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });

    // Performs landmark detection on the local file
    vision.landmarkDetection({ source: {filename: fileName} })
        .then((results) => {
            const landmarks = results[0].landmarkAnnotations;
            console.log('Landmarks:');
            landmarks.forEach((landmark) => data1 += JSON.stringify(landmark.description) + "\n");
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    // Performs text detection on the local file
    vision.textDetection({ source: { filename: fileName } })
        .then((results) => {
            const detections = results[0].textAnnotations;
            console.log('Text:');
            detections.forEach((label) => data1 += JSON.stringify(text.description) + "\n");
            //console.log("Recognition result: \n" + data);
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });
    res.sendFile(__dirname + '/done.html');
});

app.listen(3000);

console.log("Running at Port 3000");
