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
