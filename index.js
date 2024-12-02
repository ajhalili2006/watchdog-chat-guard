// @ts-check
'use strict';

// NeDB on life support, util.isDate is removed in node 23.x, monkeypatch it
// eslint-disable-next-line global-require
if (!('isDate' in require('util'))) {
	// eslint-disable-next-line global-require
	require('util').isDate = require('util').types.isDate;
}

process.chdir(__dirname);
require('ts-node').register({ transpileOnly: true });

// Make sure data folder exists
const fs = require('fs');
fs.mkdirSync('./data', { recursive: true });

// Utils
const { logError } = require('./utils/log');

const bot = require('./bot');

bot.use(
	require('./handlers/middlewares'),
	require('./plugins'),
	require('./handlers/commands'),
	require('./handlers/regex'),
	require('./handlers/unmatched'),
);

bot.catch(logError);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bot.launch();
