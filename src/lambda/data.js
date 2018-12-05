const fs = require('fs');

exports.handler = function(event, context, callback) {
  fs.readdir('./' + event.queryStringParameters.data, function(err, filenames) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(process.env) + JSON.stringify(filenames) + process.cwd()
    });
  });
};