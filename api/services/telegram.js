/**
 * Telegram API Services
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

var querystring = require('querystring');
var https = require('https');
var request = require('request');
var stream = require('stream');
var mime = require('mime');
var restler = require('restler');
var fs = require('fs');

module.exports.sendMessage = function (chat_id, text, parse_mode, disable_web_page_preview, reply_to_message_id, reply_markup) {
  var options = {
    host: sails.config.telegram.url,
    path: "/bot" + sails.config.telegram.token + '/sendMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var post_data = JSON.stringify({
    chat_id: chat_id,
    text: text,
    parse_mode: parse_mode,
    disable_web_page_preview: disable_web_page_preview,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  });

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(json))
      });
    });
    postReq.write(post_data);
    postReq.end();
  });
};

module.exports.sendPhoto = function (chat_id, photo, caption, disable_notification, reply_to_message_id, reply_markup) {

    var formData = {
      // Pass a simple key-value pair
      chat_id: chat_id,
      // Pass data via Buffers
      photo: photo
    };

    var url = 'https://'+sails.config.telegram.url+'/bot'+sails.config.telegram.token +'/sendPhoto';
    request.post({url: url, formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });







  // var form = new FormData();
  // form.append('chat_id', chat_id);
  // form.append('photo', new Buffer(photo, "base64"));
  //
  // var options = {
  //   host: sails.config.telegram.url,
  //   path: "/bot" + sails.config.telegram.token + '/sendPhoto',
  //   method: 'POST',
  //   headers: form.getHeaders()
  // };
  //
  // sails.log.debug("DEV: OPTIONS : "+JSON.stringify(options));
  // sails.log.debug("FORMDATA: "+form.toString());
  //
  // return new Promise(function (resolve, reject) {
  //   var postReq = https.request(options);
  //
  //   form.pipe(postReq);
  //   postReq.on('error', function(res) {
  //     sails.log.error("ERROR : : : "+res);
  //     reject(res);
  //   });
  //   postReq.on('end', function(res) {
  //     sails.log.debug("END: : :"+res);
  //     resolve(res);
  //   });
  // });


};

module.exports.answerCallbackQuery = function (callback_query_id, text, show_alert) {
  var options = {
    host: sails.config.telegram.url,
    path: "/bot" + sails.config.telegram.token + '/answerCallbackQuery',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var post_data = JSON.stringify({
    callback_query_id: callback_query_id,
    text: text,
    show_alert: show_alert
  });

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(json))
      });
    });
    postReq.write(post_data);
    postReq.end();
  });
};


module.exports.setWebHook = function (url) {
  return new Promise(function (resolve, reject) {
    var formData = {
      url: url
    };
    request.post({
      url: 'https://' + sails.config.telegram.url + '/bot' + sails.config.telegram.token + '/setWebHook',
      formData: formData
    }, function (err, httpResponse, body) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(body))
    });

  })
};

module.exports.getFile = function (file_id) {
  var options = {
    host: sails.config.telegram.url,
    path: '/bot' + sails.config.telegram.token + '/getFile?file_id=' + file_id
  };

  return new Promise(function (resolve, reject) {
    https.get(options, function (res) {
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(json));
      });
      res.on('error', function () {
      })
    });
  })
};

module.exports.pushToS3 = function (path) {
  var url = 'https://api.telegram.org/file/bot' + sails.config.telegram.token + '/' + path;
  var file = path.split('/');
  var file_name = file[1];

  return new Promise(function (resolve, reject) {
    var StreamingS3 = require('streaming-s3'),
      request = require('request');
    var rStream = request.get(url);
    var uploader = new StreamingS3(rStream, {
        accessKeyId: sails.config.s3.accessKeyId,
        secretAccessKey: sails.config.s3.secretAccessKey
      },
      {
        Bucket: sails.config.s3.bucket,
        Key: file_name,
        ContentType: 'image/jpeg'

      }, function (err, resp, stats) {
        if (err) {
          sails.log.error("ERROR IN PUSH TO S3: " + err);
          reject(err);
        }
        else if (resp) {
          resolve(file_name);
        }


      }
    );

  })
};

module.exports.downloadFile = function (file_path) {
  var options = {
    host: "api.telegram.org",
    path: "/file/bot" + sails.config.telegram.token + file_path
  };
  return new Promise(function (resolve, reject) {
    https.get(options, function (res) {
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(json));
      });
    });
  })
};

