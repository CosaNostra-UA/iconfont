# FilmOn IconFont Library

Universal library to generate icon fonts across all our's projects
## Goals

* automating the creation of fonts for all the company's projects
* version control for each icon font
* uniform basis of icons for all projects

## Background and strategic fit

* each icon is a separate file in the library (directory) and has a readable name
* this library allows to generate the font of a certain set of icons and demo css / less for use in the ui-kit
* input data to the library - mapping "character code - the name used icons"
* the library exports gulp and grunt wrappers (for gulp / grunt tasks)
* based of nodejs + expressjs create website like iconmoon


## Installation

```

npm install git+ssh://git@git.111pix.com:7999/~marina.tsymbal/library-iconfont.git
```

## Usage

### Through gulp task

Change data from inputData.json since you need.



## Hacking 

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
=======
