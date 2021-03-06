# Jcli

JCli is a lightweight javscript command line interpreter. It is lousely based/inspired by GCli.

## Preparing the development environment
First run `bower install` at the root of the project in order to download the 3rd party libraries required to build the project and run the demos.
Then run `npm install` at the root of the project. It will download locally the node modules necessary for generating the documenation and running unit tests.

### Documentation
You can generate the documentation by running this command at the root of the project:

`grunt yuidoc`

### Building
You can build JCli by using Requirejs Node module and the configuration file like so:

`grunt build`

### Testing
You can run unit tests (Karma + PhantomJS) and get code coverage by running:

`grunt test`

## TODO
 - Unit tests with Karma
 - Export the typechecking in a separate file to unit test it later
 - Write a How To in the README file
 - Add support for more types: differentiate number(integer and floats), booleans, restricted choices(array)
 - Add examples for Ajax support
 - Checkout [Almond](https://github.com/jrburke/almond) for proposing a built library which does not require RequireJs.
