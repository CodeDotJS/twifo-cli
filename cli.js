#!/usr/bin/env node

'use strict';

const twifo = require('twifo');

const colors = require('colors');

const argv = require('yargs')

    .usage(colors.cyan.bold('  \nUsage: $0 -u [user.name]'))

    .demand(['u'])

    .describe('u', 'Twitter username')

    .argv;