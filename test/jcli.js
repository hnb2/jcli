/**
 * Test the class Jcli 
 */
define(['jcli'], function (Jcli) {
    "use strict";

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
        });

    });

});

