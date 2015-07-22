/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var upload = require('./upload.model');

exports.register = function(socket) {
  upload.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  upload.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('upload:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('upload:remove', doc);
}
