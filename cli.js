#!/usr/bin/env node

'use strict';

const twifo = require('twifo');

const colors = require('colors');

const argv = require('yargs')

    .usage(colors.cyan.bold('\nUsage: $0 -u [user.name]'))

    .demand(['u'])

    .describe('u', 'Twitter username')

    .argv;

twifo(argv.u).then(user => {
	const inf = [];

	const informationRow = (prefix, key) => {
		if (user[key]) {
			inf.push(`${prefix}: ${user[key]}`);
		}
	};

	console.log('\n');

	informationRow(' ❱ Name      ', 'name');

	informationRow(' ❱ Handle    ', 'handle');

	informationRow(' ❱ Bio       ', 'bio');

	informationRow(' ❱ Joined    ', 'joined');

	informationRow(' ❱ Tweets    ', 'tweets');

	informationRow(' ❱ Following ', 'following');

	informationRow(' ❱ Followers ', 'followers');

	informationRow(' ❱ Likes     ', 'likes');

	console.log(inf.join('\n'));

	console.log('\n');
});
