// @ts-check
'use strict';

// NeDB on life support
// some util methods are removed in node 23.x, monkeypatch them
const util = require('util');
const patch_methods = [ 'isDate', 'isRegExp' ];
for (let i = 0; i < patch_methods.length; i++) {
	util[patch_methods[i]] = util.types[patch_methods[i]];
}
util.isArray = Array.isArray;

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
