# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation

```
git clone ssh://git@git.111pix.com:7999/fw/library-iconfont.git
npm install
```

## Usage

### Integration for your project

```
npm install --save git+ssh://git@git.111pix.com:7999/fw/library-iconfont.git
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

### Using web interface
```
cd .../library-iconfont  
```  

 - For the first time:
```
gulp build
```

 - Run server:
```
/usr/bin/node ./src/server.js or npm run server  
```  

 - Open your browser at "http://localhost:3002/"

## Hacking

### Using library-iconfont gulp task

 - Change data from inputData.json since you need.
 
#### Example
 
```
{
  "config": {
    "destFontPath": "fonts/",
    "className": "filmon",
    "fontFamily": "filmon-icon"
  },
  "iconslist": {
    "comment-icons/comments-3.svg": {
      "unicode": "EA04",
      "name": "comments-3"
    },
    "file-icons/attachment-picture.svg": {
      "unicode": "EA07",
      "name": "attachment-picture"
    }
  }
}
```

 - Runing gulp task
 
```
gulp iconfont
```

### To generate baseData.json
####  Warning!!!! 
Unicode values are assigned randomly
```
gulp basedata
```


### To change set of source icons

```
- add or remove icons in ./icons-library
- change src/baseData.json since you need
gulp generateHtml
gulp html
```