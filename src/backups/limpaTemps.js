const fs = require('fs');
const path = require('path');

function deleteTemporarios(content) {

  for (let i = 0; i < content.srcListVideos.length; i++) {

    fs.stat(content.srcListVideos[i], function (err, stats) {
      if (err) {
        return console.error(err);
      }
      fs.unlink(content.srcListVideos[i], function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    });
  }
}

module.exports = deleteTemporarios