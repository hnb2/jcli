/**
 * Main class, it is the entry point where the user input is
 * parsed and executed.
 * @class JCli
 * @author Pierre Guillemot
 */
define(
    ['commands', 'parser', 'lib/q'],
    function (Commands, Parser, Q) {
    "use strict";

    /**
     * Constructor
     * @method JCli
     * @param {Object} _context, dictionnary of objects set by  the
     *                  api user.
     * @public
     */
    var JCli = function (_context) {
        this.context = _context || {};
        this.commands = new Commands();
        this.parser = new Parser();
        this.history = [];
    };

    /**
     * Add a command to JCli so that it can be interpreted.
     * @method add_command
     * @param {Object} _command, a custom object which contains the
                            data of your command.
     * @public
     */
    JCli.prototype.add_command = function (_command) {
        try {
            var command = this.commands.make_command(_command);
            this.commands.register(command);
        }
        catch (e) {
            console.error(e.message);
        }
    };

    /**
     * Callback when a command is successully executed.
     * @method successful_execution
     * @param {Object} _result, DOM object
     * @private
     */
    var successful_execution = function (_result) {
        //TODO: Trigger an event
        console.log(_result);
    };

    /**
     * Callback when a command fialed to execute.
     * @method failed_execution
     * @param {Object} _error, Error object with a message set
     * @private
     */
    var failed_execution = function (_error) {
        //TODO: Trigger an event
        console.error(_error.message);
    };

    /**
     * Interpret the user input (if possible), by parsing it, searching
     * for the command, and then execute it with the arguments and
     * context set by the user when constructing JCli.
     * @method interpret
     * @param {String} _text, the user input
     * @public
     */
    JCli.prototype.interpret = function (_text) {
        var commandOptions;

        //First: parse the input
        try {
            commandOptions = this.parser.parse(_text);
        }
        catch (e) {
            return failed_execution(e.message);
        }

        //Second: try to retrieve the command
        var command = this.commands.get_command(
            commandOptions.commandName
        );

        //TODO: Have get_command thow an exception instead
        if (command === undefined) {
            return failed_execution(
                new Error(
                    'Cannot find command ' +
                    commandOptions.commandName
                )
            );
        }

        //TODO: Add another processing step to change the array
        // of args into a dictionnary to have named keys.

        //Third: Keep the command in the history
        this.history.push(_text);

        //Finally: try to execute the 'exec' method
        var that = this;
        Q.fcall(function () {
            return command.exec(
                commandOptions.args,
                that.context
            );
        }).then(
            successful_execution,
            failed_execution
        );
    };

    return JCli;

});
