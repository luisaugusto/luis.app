const fs = require('fs');

exports.handler = function(event, context, callback) {
  fs.readdir('./data/' + event.queryStringParameters.data, function(err, filenames) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(filenames)
    });
  });
};