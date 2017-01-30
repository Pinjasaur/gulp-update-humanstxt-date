# gulp-update-humanstxt-date

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
    .pipe(gulp.dest("dist"))
);
```

## Caveats

As per the [humans.txt standard](http://humanstxt.org/Standard.html), the year is expected in the YYYY/MM/DD format.

## API

### updateHumanstxtDate([options])

#### options

##### log

Type: `Boolean`<br>
Default: `false`

Log out the previous date and the current date as it will be replaced in `humans.txt`. Useful for debugging.


## License

MIT © Paul Esch-Laurent
