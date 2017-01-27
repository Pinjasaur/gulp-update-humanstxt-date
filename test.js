"use strict";

const humanstxt = require("./"),
      util      = require("gulp-util"),
      moment    = require("moment"),
      chai      = require("chai"),
      assert    = chai.assert;

describe("gulp-update-humanstxt-date tests", () => {
  it("should update the date", () => {
    const stream = humanstxt({ log: true });

    stream.on("data", file => {
      assert.equal(file.contents.toString(), "Last updated: " + moment().format("YYYY/MM/DD"));
    });

    stream.write(new util.File({
      contents: new Buffer("Last updated: 0000/00/00")
    }));
  });
});
