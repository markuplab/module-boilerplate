var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');

var Lib = require('../../src/lib');

lab.experiment('Simple experiment', function() {
  lab.test('Simple test', function(done) {
    assert(Lib);
    done();
  });
});
