/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /uploads              ->  index
 * POST    /uploads              ->  create
 * GET     /uploads/:id          ->  show
 * PUT     /uploads/:id          ->  update
 * DELETE  /uploads/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var dirPath = __dirname + '/../../../server/uploads/';

// Get list of uploads
exports.index = function(req, res) {
  Upload.find(function (err, uploads) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(uploads);
  });
};

// Get a single upload
exports.show = function(req, res) {
  Upload.findById(req.params.id, function (err, upload) {
    if(err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    return res.json(upload);
  });
};

exports.create = function (req, res, next) {
  var data = _.pick(req.body, 'type')
      , uploadPath = path.normalize(dirPath)
      , file = req.files.file;

  return res.status(201).json(file.path);

  // console.log(file.name); //original name (ie: sunset.png)
  // console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
};

// Deletes a upload from the DB.
exports.destroy = function(req, res)
{

  var files = fs.readdirSync(dirPath);
  if (files.length > 0)
  {
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  }

  console.log(files); //original name (ie: sunset.png)
  return res.status(201);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
