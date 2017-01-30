"use strict";

const util = require("gulp-util");
const through = require("through2");
const moment = require("moment");

module.exports = function(options) {
  options = options || {};

  function updateDate(file, options) {
    const now   = moment().format("YYYY/MM/DD"),
          regex = /Last updated?: ?(\d{4}\/\d{2}\/\d{2})/i,
          prev  = regex.exec(file)[1];

    if (options.log) {
      util.log(
        `${util.colors.cyan("[gulp-update-humanstxt-date]")} ` +
        `Found the previous date to be: ${util.colors.red(prev)}. ` +
        `Replacing with ${util.colors.green(now)}.`
      );
    }

    file = file.replace(prev, now);
    return file;
  }

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new util.PluginError("gulp-update-humanstxt-date", "Streaming not supported"));
      return;
    }

    try {
      file.contents = new Buffer(updateDate(file.contents.toString(), options));
      this.push(file);
    } catch (err) {
      this.emit("error", new util.PluginError("gulp-update-humanstxt-date", err));
    }

    cb();
  });
};
