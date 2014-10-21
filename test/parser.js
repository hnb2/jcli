/**
 *
 */
define(['command', 'parser'], function (Command, Parser) {
    "use strict";

    var MOCK_NAME = 'hello';
    var MOCK_DESC = 'Says hello.';
    var MOCK_PARAMS = [
        {
            'name': 'name',
            'type': 'string'
        }
    ];

    var get_mock_command = function () {
        return new Command(
            MOCK_NAME,
            MOCK_DESC,
            MOCK_PARAMS
        );
    };

    describe('Parser', function () {

        describe('Constructor', function () {
            it('should initialize a Parser', function () {
                var parser = new Parser();

                expect(parser).toBeDefined();
            });
        });

        describe('parse', function () {
            var parser = new Parser();

            it('Should raise an exception if the the text is undefined', function () {
                var parse_empty = function () {
                    parser.parse();
                };

                expect(parse_empty).toThrow();
            });

            it('Should raise an exception if the the text is empty', function () {
                var parse_empty = function () {
                    parser.parse('');
                };

                expect(parse_empty).toThrow();
            });

            it('Should return the command name', function () {
                var result = parser.parse('hello');

                expect(result.commandName).toEqual('hello');
                expect(result.args).toEqual([]);
            });

            it('Should return the command name and parameters', function () {
                var result = parser.parse('cp source destination');

                expect(result.commandName).toEqual('cp');
                expect(result.args).toEqual(['source', 'destination']);
            });
        });

        describe('parse', function () {
            var parser = new Parser();

            it(
                'Should throw if the number of arguments' +
                'given by the user and defined by the command' +
                'is different',
                function () {
                var validate_arguments = function () {
                    parser.validate_arguments(
                        get_mock_command(),
                        []
                    );
                };

                expect(validate_arguments).toThrow();
            });

            it('Should throw if one of the argument is not a string', function () {
                var validate_arguments = function () {
                    parser.validate_arguments(
                        get_mock_command(),
                        [0]
                    );
                };

                expect(validate_arguments).toThrow();
            });

            it('Should throw if one of the argument is not a number', function () {
                var params = [
                    {
                        'name' : 'random number',
                        'type' : 'number'
                    }
                ];

                var validate_arguments = function () {
                    parser.validate_arguments(
                        new Command(
                            MOCK_NAME,
                            MOCK_DESC,
                            params
                        ),
                        ['im a number']
                    );
                };

                expect(validate_arguments).toThrow();
            });

            it('Should parse the string into a number', function () {
                var params = [
                    {
                        'name' : 'random number',
                        'type' : 'number'
                    }
                ];

                var command = new Command(
                    MOCK_NAME,
                    MOCK_DESC,
                    params
                );

                var args = ['42'];

                parser.validate_arguments(command, args);

                expect(args).toEqual([42]);
            });

            it('Should validate the string argument', function () {
                var args = ['John'];

                parser.validate_arguments(get_mock_command(), args);

                expect(args).toEqual(['John']);
            });

            it(
                'Should throw if one of the parameter of the' +
                'command does not have a supported data type',
                function () {
                var params = [
                    {
                        'name' : 'potato',
                        'type' : 'potato'
                    }
                ];

                var command = new Command(
                    MOCK_NAME,
                    MOCK_DESC,
                    params
                );

                var validate_arguments = function () {
                    parser.validate_arguments(
                        command,
                        ['potatoes']
                    );
                };

                expect(validate_arguments).toThrow();
            });
        });

    });
});
