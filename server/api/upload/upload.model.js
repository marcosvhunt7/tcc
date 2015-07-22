'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  name: String,
  data: Date,
  time: String,
  tipo: String,
  valor: String
});

module.exports = mongoose.model('Upload', UploadSchema);
