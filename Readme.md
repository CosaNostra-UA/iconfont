# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects

## Installation

```
git clone ssh://git@git.111pix.com:7999/~marina.tsymbal/library-iconfont.git
npm install
```

## Usage

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