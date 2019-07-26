# nonce - disposable link shortener

Creates links that expires after being clicked n (default 1) number of times.

Requires auth.js in root directory with MySQL connection parameters (see node-mysql docs).

Setup:

	git clone https://github.com/namansood/nonce.git
	cd nonce
	nano auth.js
	npm install
	PORT=portnumber node server.js

Server should be live at localhost:portnumber. If PORT is not specified, the default port is 32767.

