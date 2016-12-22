# CosaNostra (ex FilmOn/111pix team) IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation


```
git clone git@github.com:CosaNostra-UA/iconfont.git
npm install && npm run start
```

## Usage

### Integration for your project

```
npm install --save git+ssh://git@github.com:CosaNostra-UA/iconfont.git
```

 - Create selection config somewhere (gulp/font-config.json) using your favorite editor or iconfont webinterface

```
gulp.task('generate-filmon-font', function() {
	
	var webFontData = require('./gulp/font-config.json');
	var generator   = require('library-iconfont');

	return generator(webFontData.config.fontFamily, webFontData.iconslist)
	            .pipe(gulp.dest('public/' + webFontData.config.destFontPath + webFontData.config.fontFamily));
});

```

### Using web interface
```
cd .../library-iconfont  
```  

 - For the first time:
```
gulp scripts
```

 - Run server:
```
/usr/bin/node ./src/server.js 
or 
npm run server  
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
```
