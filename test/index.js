'use strict';

var ns = require('oktopost-namespace');

var a = ns.dynamic(__dirname + '/..');

console.log(a.OUI.core.pos.Positioner({}));

//module.exports = require('oktopost-namespace').dynamic(__dirname + '/..').OUI;