"use strict";

const util = require("gulp-util");
const through = require("through2");
const moment = require("moment");

module.exports = function(options) {
  // Avoid "cannot get property of `undefined`" type errors
  options = options || {};

  function updateDate(file, options) {
    const now   = moment().format("YYYY/MM/DD"),
          // Regular Expression breakdown:
          // 1) Match "Last updated: " case in-sensitive
          //   - The 'd' is optional
          //   - The space after the colon is optional
          // 2) Exactly 4 digits followed by a slash
          // 3) Exactly 2 digits followed by a slash
          // 4) Exactly 2 digits
          //
          //            [1]          [2]    [3]    [4]
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
