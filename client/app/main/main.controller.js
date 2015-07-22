'use strict';

angular.module('tccApp')
  .controller('MainCtrl', ['$timeout', 'Upload', '$scope', '$http', 'socket', function ($timeout, Upload, $scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/uploads').success(function(awesomeUploads) {
      $scope.awesomeUploads = awesomeUploads;
      socket.syncUpdates('upload', $scope.awesomeUploads);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.deleteUpload = function(upload) {
      $http.delete('/api/uploads/' + upload._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('upload');
    });


    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.log = '';

    $scope.addUpload = function() {
      // if($scope.newThing === '') {
      //   return;
      // }
      // $http.post('/api/uploads', {
      //                               name: 'Marcos Brito',
      //                               data: new Date,
      //                               time: '135',
      //                               tipo: '10c',
      //                               valor: '1500'
      //                             });
      // $scope.newThing = '';

        $http.delete('/api/uploadsFile');
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/uploadsFile',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                })
                .error(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
            }
        }
    };
  }]);
