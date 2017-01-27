# gulp-update-humanstxt-date

Update the `last updated` date in a `humans.txt` file.

## Install

With npm (`npm install --save-dev gulp-update-humanstxt-date`) or with Yarn (`yarn add --dev gulp-update-humanstxt-date`).


## Usage

```js
const gulp = require('gulp');
const updateHumanstxtDate = require('gulp-update-humanstxt-date');

gulp.task('default', () => {
	gulp.src('src/humans.txt')
		.pipe(updateHumanstxtDate())
		.pipe(gulp.dest('dist'))
);
```

## API

### updateHumanstxtDate([options])

#### options

##### log

Type: `boolean`<br>
Default: `false`

Log out the previous date and the current date as it will be replace in `humans.txt`. Useful for debugging.


## License

MIT © Paul Esch-Laurent
