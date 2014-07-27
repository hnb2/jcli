/**
 * Demo to present JCli
 * @class Demo
 * @author Pierre Guillemot
 */
require(['jcli', 'jquery'], function (JCli, $) {
    "use strict";

    //Initialize JCLI, no context here
    var jcli = new JCli();

    //Create a simple hello command
    var hello = {
        'name': 'hello',
        'description': 'Just say hello.',
        'params': [
            {
                'name': 'name',
                'type': 'string'
            }
        ],
        'exec': function (args, context) {
            return 'Hello ' + args[0];
        }
    };

    //Add it to our command registry
    jcli.add_command(hello);

    //When a command has been successfully executed, append it to
    // the main div.
    jcli.successful_execution = function (_result) {
        var success = $('<div>').attr(
            'class',
            'cli-entry'
        ).text(_result);
        $('#cli').append(success);
    };

    //When a command has failed, do the same but add a class 'error'
    // to print the message in red.
    jcli.failed_execution = function (_result) {
        var failure = $('<div>').attr(
            'class',
            'cli-entry error'
        ).text(_result);
        $('#cli').append(failure);
    };

    //When clicking on 'Submit', interpret the command
    $('#submit').on('click', function () {
        jcli.interpret(
            $('#in').val().trim()
        );

        $('#in').val('');
    });

});
