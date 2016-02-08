# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation

```
git clone ssh://git@git.111pix.com:7999/~marina.tsymbal/library-iconfont.git
npm install
```

## Usage 
 

 npm install --save git+ssh://...../library-iconfont.git 

 - create selection config somewhere  (gulp/font-config.json) using your favorite editor or iconfont webinterface 

```
gulp.task('generate-filmon-font', function() { 

	var selection = require('./gulp/font-config.json'); 
	var fontName = "filmon-icon-font"; 

	var generator = require('library-iconfont');

	return generator( fontName, selection).pipe(gulp.dest('./public/build/fonts/'));
});

```




## Hacking

### Through gulp task

Change data from inputData.json since you need.

To running with default font name ('filmon-iconfont')

```
gulp iconfont
```

To running with the given font name

```
gulp iconfont --env <fontName>
```

### To change set of source icons into index.html

```
// first, change src/baseData.json since you need
gulp generateHtml
gulp html
```



TODO: 

   --- regenerate baseData.json  : gulp task basedata (done)
   --- basefont add to default/build/serve task (done)
   --- allow to copypaste json (selection.json) from webinterface (done)
   --- "Example app running on port 3002 " replace with " Open your browser at "http://localhost:3002/"  and enjoy the show! (done)
 
