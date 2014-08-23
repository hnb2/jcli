/**
 * Demo to present JCli
 * @class Demo
 * @author Pierre Guillemot
 */
require(['jcli', 'jquery'], function (JCli, $) {
    "use strict";
 
    //When a command has been successfully executed, append it to
    // the main div.
    var successful_execution = function (_result) {
        var success = $('<div>').attr(
            'class',
            'cli-entry'
        ).text(_result);
        $('#cli').append(success);
    };

    //When a command has failed, do the same but add a class 'error'
    // to print the message in red.
    var failed_execution = function (_error) {
        var failure = $('<div>').attr(
            'class',
            'cli-entry error'
        ).text(_error.message);
        $('#cli').append(failure);
    };

    var options = {
        context: {},
        on_success: successful_execution,
        on_failure: failed_execution
    };

    //Initialize JCLI
    var jcli = new JCli(options);

    //Create a simple add command
    var add = {
        'name': 'add',
        'description': 'Add two integers',
        'params': [
            {
                'name': 'a',
                'type': 'number'
            },
            {
                'name': 'b',
                'type': 'number'
            }
        ],
        'exec': function (a, b, context) {
            return a + b;
        }
    };

    //Create a simple subtract command
    var subtract = {
        'name': 'subtract',
        'description': 'Subtract two integers',
        'params': [
            {
                'name': 'a',
                'type': 'number'
            },
            {
                'name': 'b',
                'type': 'number'
            }
        ],
        'exec': function (a, b, context) {
            return a - b;
        }
    };

    //Create a simple multiply command
    var multiply = {
        'name': 'multiply',
        'description': 'Multiply two integers',
        'params': [
            {
                'name': 'a',
                'type': 'number'
            },
            {
                'name': 'b',
                'type': 'number'
            }
        ],
        'exec': function (a, b, context) {
            return a * b;
        }
    };

    //Create a simple divide command
    var divide = {
        'name': 'divide',
        'description': 'Divide two integers',
        'params': [
            {
                'name': 'a',
                'type': 'number'
            },
            {
                'name': 'b',
                'type': 'number'
            }
        ],
        'exec': function (a, b, context) {
            if (b === 0) {
                throw new Error(
                    'Please do not try dividing by 0...'
                );
            }

            return a / b;
        }
    };

    //Add it to our command registry
    jcli.add_command(add);
    jcli.add_command(subtract);
    jcli.add_command(multiply);
    jcli.add_command(divide);

    //When clicking on 'Submit', interpret the command
    $('#submit').on('click', function () {
        jcli.interpret(
            $('#in').val().trim()
        );

        $('#in').val('');
    });

});
