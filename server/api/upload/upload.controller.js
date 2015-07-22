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
var Upload = require('./upload.model');

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

// Creates a new upload in the DB.
exports.create = function(req, res) {
  Upload.create(req.body, function(err, upload) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(upload);
  });
};

// Deletes a upload from the DB.
exports.destroy = function(req, res) {
  Upload.findById(req.params.id, function (err, upload) {
    if(err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    upload.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
