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
          exec  = regex.exec(file),
          // If no match, set `prev` to null
          prev  = (exec !== null) ? exec[1] : null;

    // Log out relevant info if options.log is set to `true`
    if (options.log) {
      if (!prev) {
        util.log(
          `${util.colors.cyan("[gulp-update-humanstxt-date]")} ` +
          `${util.colors.red("No match was found")}. Verify that it follows the following format: ` +
          `${util.colors.green("Last update(d): YYYY/MM/DD")}.`
        );
      } else {
        util.log(
          `${util.colors.cyan("[gulp-update-humanstxt-date]")} ` +
          `Found the previous date to be: ${util.colors.red(prev)}. ` +
          `Replacing with ${util.colors.green(now)}.`
        );
      }
    }

    // Only replace if there's something to replace...
    if (prev) {
      file = file.replace(prev, now);
    }

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
