/**
 * Test the class Jcli 
 */
define(['jcli'], function (Jcli) {
    "use strict";

    describe('Jcli', function () {

        describe('Constructor', function () {

            it(
                'Should initialize a jcli object with' +
                'default callbacks',
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
                'a context, and 2 callbacks.',
                function () {

                //TODO
            });

        });

    });

});

