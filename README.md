# Jcli

JCli is a lightweight javscript command line interpreter. It is lousely based/inspired by GCli.

## Preparing the development environment
Simply run `npm install` at the root of the project. It will download locally the node modules necessary for generating the documenation and running unit tests.

### Documentation
You can generate the documentation by running this command at the root of the project:

`yuidoc -c yuidoc.json`

### Building
You can build JCli by using Requirejs Node module and the configuration file like so:

`r.js -o build.js`
