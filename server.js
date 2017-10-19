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


/*app.post('/upload-target',function(req,res){
    console.log("upload-target " + req.filename );
    fs.readFile(req.file, function (err, data) {
        // ...
        var newPath = __dirname + "/uploads/uploadedFileName";
        fs.writeFile(newPath, data, function (err) {
        res.redirect("back");
        });
    });
});*/

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
    res.status( 200 ).send( req.file );
});

app.get('/',function(req,res){
  console.log("Sending data");
  res.sendFile(__dirname + '/index.html');
  //__dirname : It will resolve to your project folder.
});

app.get('/upload',function(req,res){
    console.log("Upload file"); 
    res.sendFile(__dirname + '/upload.html');
});

app.get('/result',function(req,res){
    console.log(data1);
    res.send(data1);
});

app.get('/recognize',function(req, res){
    console.log("Recognize");  
    //var data = "test";
    data1 = "";
    console.log(data1 + "\n");

    // Instantiates a client
    const vision = Vision();
    // The path to the local image file, e.g. "/path/to/image.png"
    const fileName = '/home/srazin/Development/visionapi/2.jpg';

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

app.get('/sitemap',function(req,res){
  res.sendFile('sitemap.html');
});

app.listen(3000);

console.log("Running at Port 3000");
