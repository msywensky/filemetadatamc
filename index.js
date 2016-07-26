var express = require('express');
var multer  = require('multer');
var path = require('path');
var app = express();
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
var glob = require('glob');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));

app.post("/upload", upload.single('myfile'), function(req, res){
    res.send({size: req.file.size});
    glob("uploads/*",function(er,files) {
      files.forEach(function(element) {
        console.log("file:" + element);
        fs.unlink(element);
      }, this);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

