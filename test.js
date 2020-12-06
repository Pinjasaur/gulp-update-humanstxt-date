"use strict";

const humanstxt = require("./"),
      util      = require("gulp-util"),
      moment    = require("moment"),
      chai      = require("chai"),
      assert    = chai.assert;

describe("gulp-update-humanstxt-date tests", () => {
  it("should update the date", () => {
    const stream = humanstxt();

    stream.on("data", file => {
      assert.equal(file.contents.toString(), "Last updated: " + moment().format("YYYY/MM/DD"));
    });

    stream.write(new util.File({
      contents: new Buffer("Last updated: 0000/00/00")
    }));
  });

  it("should not modify the file when no pattern is found", () => {
    const stream = humanstxt();

    stream.on("data", file => {
      assert.equal(file.contents.toString(), "blah blah blah");
    });

    stream.write(new util.File({
      contents: new Buffer("blah blah blah")
    }));
  });

  it("should update multiline files", () => {
    const stream = humanstxt();

    stream.on("data", file => {
      assert.equal(
        file.contents.toString(),
        `The first line
         Last updated: ${moment().format("YYYY/MM/DD")}
         The last line`
      );
    });

    stream.write(new util.File({
      contents: new Buffer(
        `The first line
         Last updated: 0000/00/00
         The last line`
      )
    }));
  });

  it("should only update the first instance", () => {
    const stream = humanstxt();

    stream.on("data", file => {
      assert.equal(
        file.contents.toString(),
        `Last updated: ${moment().format("YYYY/MM/DD")}
         Last updated: 0000/00/00`
      );
    });

    stream.write(new util.File({
      contents: new Buffer(
        `Last updated: 0000/00/00
         Last updated: 0000/00/00`
      )
    }));
  });

  it("should leave unicode unmodified", () => {
    const stream = humanstxt();

    stream.on("data", file => {
      assert.equal(
        file.contents.toString(),
        `🤘™`
      );
    });

    stream.write(new util.File({
      contents: new Buffer(
        `🤘™`
      )
    }));
  });
});
