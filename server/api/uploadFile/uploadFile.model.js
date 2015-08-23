'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  dados: String,
  dadosRegistrados: Date
});

module.exports = mongoose.model('Upload', UploadSchema);
