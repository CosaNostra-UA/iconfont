# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation

```
npm install --save git+ssh://git@git.111pix.com:7999/fw/library-iconfont.git
```

## Usage

 - For the first time:
```
 gulp basedata
 gulp build
```


 - Create selection config somewhere (gulp/font-config.json) using your favorite editor or iconfont webinterface

```
gulp.task('generate-filmon-font', function() {
	var fontName = "filmon-icon-font";
	var selection = require('./gulp/font-config.json');
	var generator = require('library-iconfont');

	return generator(fontName, selection).pipe(gulp.dest('./public/build/fonts/'));
});

```

## Hacking

### Using library-iconfont gulp task

 - Change data from inputData.json since you need.

 - To running with default font name ('filmon-iconfont'):

```
gulp iconfont
```

 - To running with the given font name:

```
gulp iconfont --env <fontName>
```

### To change set of source icons into index.html

```
 - first, change src/baseData.json since you need
gulp generateHtml
gulp html
```