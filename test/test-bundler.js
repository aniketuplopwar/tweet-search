
const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

// Mocha / Chai
// ------------------------------------
mocha.setup({ ui: 'bdd' })
chai.should()

global.chai = chai
global.expect = chai.expect
global.sinon = sinon

// Chai Plugins
// ------------------------------------
chai.use(chaiEnzyme())
chai.use(dirtyChai)
chai.use(chaiAsPromised)
chai.use(sinonChai)

// Test Importer
// ------------------------------------
// We use a Webpack global here as it is replaced with a string during compile.
// Using a regular JS variable is not statically analyzable so webpack will throw warnings.
const testsContext = require.context('./', true,  /.spec\.js$/)

// When a test file changes, only rerun that spec file. If something outside of a
// test file changed, rerun all tests.
// https://www.npmjs.com/package/karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = []
const allTests = testsContext.keys()
const changedTests = allTests.filter(path => {
    return __karmaWebpackManifest__.indexOf(path) !== -1
  })

;(changedTests.length ? changedTests : allTests).forEach(testsContext)