kyll-thrill
===========
[![Build Status](https://secure.travis-ci.org/eiriksm/kyll-thrill.png)](http://travis-ci.org/eiriksm/kyll-thrill)
[![Coverage Status](https://coveralls.io/repos/eiriksm/kyll-thrill/badge.png?branch=master)](https://coveralls.io/r/eiriksm/kyll-thrill?branch=master)
[![Dependency Status](https://david-dm.org/eiriksm/kyll-thrill.png)](https://david-dm.org/eiriksm/kyll-thrill)

It's a blog tool that clocks in at 5kb and 1 HTTP request.

## Getting started.
- Clone this repo.
- Edit the appropriate settings (_config.yml)
- Write some posts (see [Jekyll docs](http://jekyllrb.com/) for info).
- Publish to github (see [Jekyll docs](http://jekyllrb.com/) for info).

## Customizing
- Make sure you have `npm` installed.
- Install gulp with `[sudo] npm install -g gulp`
- Install all dependencies with `npm install`.
- Compile for production with `gulp`
- All javascript and css are put inline. Compile inline with `gulp inline`.
- Only edit the `layout_templates/default.html` if you are doing changes. This is the template for compiling inline.
- For development this command is handy: `JEKYLL_ENV='development' jekyll serve -w --baseurl ""`
- Have fun, be awesome.

## Todos:
- Tests
- ...

## Licence
MIT.
