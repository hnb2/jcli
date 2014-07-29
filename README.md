# Jcli

JCli is a lightweight javscript command line interpreter. It is lousely based/inspired by GCli.

## Preparing the development environment
Simply run `npm install` at the root of the project. It will download locally the node modules necessary for generating the documenation and running unit tests.

### Documentation
You can generate the documentation by running this command at the root of the project:

`grunt yuidoc`

### Building
You can build JCli by using Requirejs Node module and the configuration file like so:

`r.js -o build.js`

## TODO
 - Simplify the building/doc generation and other tasks by using Grunt
 - Unit tests with Karma
 - Provide a facade for the user to plug into JCli events
