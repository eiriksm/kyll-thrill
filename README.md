kyll-thrill
===========
[![Build Status](https://travis-ci.org/eiriksm/kyll-thrill.svg?branch=master)](https://travis-ci.org/eiriksm/kyll-thrill)
[![Coverage Status](https://img.shields.io/coveralls/eiriksm/kyll-thrill.svg)](https://coveralls.io/r/eiriksm/kyll-thrill?branch=master)
[![devDependency Status](https://david-dm.org/eiriksm/kyll-thrill/dev-status.svg)](https://david-dm.org/eiriksm/kyll-thrill#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/eiriksm/kyll-thrill.svg)](https://codeclimate.com/github/eiriksm/kyll-thrill)

It's a blog tool that clocks in at < 7kb and 1 HTTP request.

## Getting started.
- Clone this repo.
- Edit the appropriate settings (_config.yml)
- Write some posts (see [Jekyll docs](http://jekyllrb.com/) for info).
- Publish to github (see [Jekyll docs](http://jekyllrb.com/) for info).

## Customizing
- Make sure you have `npm` and `jekyll` installed.
- Install [gulp](http://gulpjs.com/) with `[sudo] npm install -g gulp`
- Install all dependencies with `npm install`.

## Themes
By default, kyll-thrill comes with one theme: _thrill_. If you want to make your own theme, you can start with just copying the folder `./themes/thrill` into another folder in `themes`.

Next step is to tell the config you will be using another theme. Edit at the appropriate place in `_config.yml`

At last, make sure you compile templates, javascripts and css from your theme. The workflow is as follows:
- Compile assets for production with `gulp`
- All javascript and css are put inline. Compile inline with `gulp inline`.
- A nifty command is `make compile` which will do the following for you:
  - `gulp`
  - `gulp inline`
  - `JEKYLL_ENV='development' jekyll serve -w --baseurl "" --trace`

### Note:
- Remember to only edit `templates/*.html` in your theme if you are doing changes. This is the template for compiling inline.
- For development this command is handy: `JEKYLL_ENV='development' jekyll serve -w --baseurl ""`
- Have fun, be awesome.

## Tests
Tests are run with [Karma](http://karma-runner.github.io/). The default setup
for karma is running them through [PhantomJS](http://phantomjs.org/), but you
can look in karma.conf.js to see how you can also run them for example in
Chrome.

All tests are run with `make test`

## Licence
MIT.
