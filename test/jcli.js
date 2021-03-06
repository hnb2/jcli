/**
 * Test the class Jcli 
 */
define(['jcli'], function (Jcli) {
    "use strict";

    var MOCK_CMD_NAME = 'hello';
    var MOCK_CMD_DESC = 'Says hello.';
    var MOCK_CMD_PARAMS = [
        {
            'name': 'name',
            'type': 'string'
        }
    ];
    var MOCK_CMD_EXEC = function (name, context) {
        return 'Get out of my garden ' + name;
    };

    var get_mock_command = function () {
        return {
            'name': MOCK_CMD_NAME,
            'description' : MOCK_CMD_DESC,
            'params' : MOCK_CMD_PARAMS,
            'exec': MOCK_CMD_EXEC
        };
    };

    describe('Jcli', function () {

        describe('Constructor', function () {

            it(
                'Should initialize a jcli object with' +
                'default callbacks and an empty context',
                function () {
                var jcli = new Jcli();

                expect(jcli.context).toEqual({});
                expect(jcli.on_success).toBeDefined();
                expect(jcli.on_failure).toBeDefined();
                expect(jcli.commands).toBeDefined();
                expect(jcli.parser).toBeDefined();
                expect(jcli.history).toEqual([]);
            });

            it(
                'Should initialize a jcli object with' +
                'a context and 2 callbacks.',
                function () {
                var context = {
                    currentUsername: 'John Doe'
                };

                var on_success = function (_result) {
                    return 'SUCCESS : ' + _result;
                };

                var on_failure = function (_result) {
                    return 'FAILURE : ' + _result;
                };

                var jcli = new Jcli(
                    {
                        context: context,
                        on_success: on_success,
                        on_failure: on_failure
                    }
                );

                expect(jcli.context).toEqual(context);
                expect(jcli.on_success).toEqual(on_success);
                expect(jcli.on_failure).toEqual(on_failure);
                expect(jcli.commands).toBeDefined();
                expect(jcli.parser).toBeDefined();
                expect(jcli.history).toEqual([]);
            });

        });

        describe('add_command', function () {
            it(
                'Throw an error if the command is undefined',
                function () {
                var jcli = new Jcli();

                var add_command = function () {
                    jcli.add_command();
                };

                expect(add_command).toThrow();
            });

            it(
                'Adds a command in the registry', function () {
                var jcli = new Jcli();
                expect(
                    jcli.commands.get_command(MOCK_CMD_NAME)
                ).not.toBeDefined();

                jcli.add_command(get_mock_command());

                expect(
                    jcli.commands.get_command(MOCK_CMD_NAME)
                ).toBeDefined();
            });

            it(
                'Throw an error if the command has already' +
                'been added in the register.',
                function () {
                var jcli = new Jcli();

                var add_command = function () {
                    jcli.add_command(get_mock_command());
                };

                add_command();
                expect(add_command).toThrow();
            });
        });

        describe('interpret', function () {
            it('calls on_failure the input is undefined', function () {
                var jcli = new Jcli();

                var interpret = function () {
                    jcli.interpret();
                };

                spyOn(jcli, 'on_failure');

                interpret();

                expect(jcli.on_failure).toHaveBeenCalled();
            });

            it('calls on_failure the input is empty', function () {
                var jcli = new Jcli();

                var interpret = function () {
                    jcli.interpret('');
                };

                spyOn(jcli, 'on_failure');

                interpret();

                expect(jcli.on_failure).toHaveBeenCalled();
            });

            it(
                'calls on_failure if the command cannot be found',
                function () {
                var jcli = new Jcli();

                var interpret = function () {
                    jcli.interpret('hi');
                };

                spyOn(jcli, 'on_failure');

                interpret();

                expect(jcli.on_failure).toHaveBeenCalled();
            });

            it(
                'calls on_failure if the command parameters are' +
                'used incorrectly: different amount of parameters',
                function () {
                var jcli = new Jcli();
                jcli.add_command(get_mock_command());

                var interpret = function () {
                    jcli.interpret('hello Boule et Bill');
                };

                spyOn(jcli, 'on_failure');

                interpret();

                expect(jcli.on_failure).toHaveBeenCalled();
            });
        });

    });

});

