# gulp-update-humanstxt-date [![Travis](https://img.shields.io/travis/Pinjasaur/gulp-update-humanstxt-date.svg)](https://github.com/Pinjasaur/gulp-update-humanstxt-date)

> Update the `last update` date in a `humans.txt` file.


## Install

With npm
```sh
npm install --save-dev gulp-update-humanstxt-date
```

or with Yarn
```sh
yarn add --dev gulp-update-humanstxt-date
```


## Usage

```js
const gulp = require("gulp");
const updateHumanstxtDate = require("gulp-update-humanstxt-date");

gulp.task("default", () => {
  gulp.src("./humans.txt")
    .pipe(updateHumanstxtDate())
    .pipe(gulp.dest("dist"));
});
```


## Caveats

As per the [humans.txt standard](http://humanstxt.org/Standard.html), the year is expected in the _YYYY/MM/DD_ format.

In addition, the general format is expected to be as follows: _Last updated: YYYY/MM/DD_. The tense of "update" can be present (update) or past (updated). Further, the space between the colon (:) and the date is optional.

If you're having trouble, enable logging: `updateHumanstxtDate({ log: true })`. If the issue persists please [let me know](https://github.com/Pinjasaur/gulp-update-humanstxt-date/issues).


## API

### updateHumanstxtDate([options])

#### options

##### log

Type: `Boolean`<br>
Default: `false`

Log out the previous date and the current date as it will be replaced in `humans.txt`. Useful for debugging.


## License

MIT &copy; Paul Esch-Laurent
