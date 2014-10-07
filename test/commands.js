/**
 * Test the model Commands 
 */
define(
    ['commands', 'command'],
    function (Commands, Command)
{
    "use strict";

    //Mock hello command
    var MOCK_HELLO_NAME = 'hello';
    var MOCK_HELLO_DESC = 'Says hello.';
    var MOCK_HELLO_PARAMS = [
        {
            'name': 'name',
            'type': 'string'
        }
    ];

    var get_mock_hello = function () {
        return new Command(
            MOCK_HELLO_NAME,
            MOCK_HELLO_DESC,
            MOCK_HELLO_PARAMS
        );
    };

    describe('Commands', function () {
        describe('Constructor', function () {

            it(
                'Should initialize the model with an empty dict of commands',
                function () {
                var base = new Commands();

                expect(base).toBeDefined();

                expect(base._get_commands()).toEqual({});
            });

        });

        describe('get_command', function () {
            var base = new Commands();

            it(
                'Should return undefined because the command does not exist',
                function () {
                expect(base.get_command(MOCK_HELLO_NAME)).not.toBeDefined();
            });

            it(
                'Should return the command',
                function () {
                base.register(get_mock_hello());
                expect(base.get_command(MOCK_HELLO_NAME)).toBeDefined();
            });
        });

        describe('register', function () {
            var base = new Commands();

            it(
                'Should throw an error if the command is undefined',
                function () {
                var register = function () {
                    base.register(undefined);
                };

                expect(register).toThrow();
            });

            it(
                'Should add the command using its name as a key',
                function () {
                expect(base._get_commands()).toEqual({});

                base.register(get_mock_hello());

                var commands = base._get_commands();
                expect(commands[MOCK_HELLO_NAME]).toBeDefined();
            });

            it(
                'Should throw because the command already exists',
                function () {
                var register = function () {
                    base.register(get_mock_hello());
                };

                expect(register).toThrow();
            });

        });

        describe('make_command', function () {

            it(
                'Should throw if the command is undefined',
                function () {
                var base = new Commands();
                var make_command = function () {
                    base.make_command(undefined);
                };

                expect(make_command).toThrow();
            });

            it(
                'Should create a new Command object',
                function () {
                var base = new Commands();

                var rawCommand = {
                    name: MOCK_HELLO_NAME,
                    description: MOCK_HELLO_DESC,
                    params: MOCK_HELLO_PARAMS,
                    exec: function () {},
                };

                var command = base.make_command(rawCommand);

                expect(command).toBeDefined();
            });

        });
    });
});
