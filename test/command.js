/**
 * Test the model Command
 */
define(['command'], function (Command) {
    "use strict";

    var MOCK_NAME = 'hello';
    var MOCK_DESC = 'Says hello.';
    var MOCK_PARAMS = [
        {
            'name': 'name',
            'type': 'string'
        }
    ];

    var get_mock_obj = function () {
        return new Command(
            MOCK_NAME,
            MOCK_DESC,
            MOCK_PARAMS
        );
    };

    describe('Command', function () {

        describe('Constructor', function () {

            it(
                'Should initialize the model with correct values',
                function () {
                var base = get_mock_obj();

                expect(base).toBeDefined();

                expect(base.get_name()).toEqual(MOCK_NAME);

                expect(base.get_description()).toEqual(MOCK_DESC);
                expect(base.get_params()).toEqual(MOCK_PARAMS);
            });

        });

        describe('exec', function () {

            it(
                'Should raise an exception if exec is not overriden',
                function () {
                var base = get_mock_obj();
                var exec = function () {
                    base.exec();
                };

                expect(exec).toThrow();
            });

        });

        describe('get_help_page', function () {

            it(
                'Should return the description of the command',
                function () {
                var base = get_mock_obj();

                expect(base.get_help_page()).toEqual(MOCK_DESC);
            });

        });
    });
});
