test:
	./node_modules/karma/bin/karma start karma.conf.js

test-cov:
	./node_modules/karma/bin/karma start karma.conf.js
	- cat ./coverage/*/lcov.info | ./node_modules/coveralls/bin/coveralls.js > /dev/null 2>&1

compile:
		gulp && gulp inline && JEKYLL_ENV='development' jekyll serve -w --baseurl "" --trace

.PHONY: test test-cov compile
