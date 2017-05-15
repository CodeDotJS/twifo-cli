#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const cheerio = require('cheerio');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const spinner = ora();

if (!arg) {
	console.log(`
 Usage: twifo <user-name>

 Example:
   $ twifo 9gag
 `);
	process.exit(1);
}

dns.lookup('twitter.com', err => {
	if (err) {
		logUpdate(`\n› Please check your internet connection\n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Twifing ${arg}`;
		spinner.start();
	}
});

const url = `https://twitter.com/${arg}`;

got(url).then(res => {
	const $ = cheerio.load(res.body);
	logUpdate(`
› Name      : ${$('.ProfileHeaderCard-nameLink').text()}
› Handle    : ${$('.ProfileHeaderCard-screennameLink').text().trim()}
› Biography : ${$('.ProfileHeaderCard-bio').text()}
› Place     : ${$('.ProfileHeaderCard-locationText').text().trim()}
› Joined    : ${$('.ProfileHeaderCard-joinDateText').text().trim().replace('Joined', '').trim()}
› Tweets    : ${$('.ProfileNav-value').eq(0).text().trim()}
› Following : ${$('.ProfileNav-value').eq(1).text().trim()}
› Follwers  : ${$('.ProfileNav-value').eq(2).text().trim()}
› Likes     : ${$('.ProfileNav-value').eq(3).text().trim()}
 `);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`\n› ${arg} is not a Twitter user\n`);
		process.exit(1);
	}
});

