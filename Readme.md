# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation

```
npm install --save git+ssh://git@git.111pix.com:7999/fw/library-iconfont.git
```

## Usage

 - For the first time:
 ```
 - write the valid path to icons in ./src/config.json
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



TODO: 

    --- regenerate baseData.json  : gulp task basedata (done)
    --- basefont add to default/build/serve task (done)
    --- allow to copypaste json (selection.json) from webinterface (done)
    --- "Example app running on port 3002 " replace with " Open your browser at "http://localhost:3002/"  and enjoy the show! (done)
 
