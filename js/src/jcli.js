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
     * @param {Object} _options, check the property doc
     * @public
     */
    var JCli = function (_options) {
        /**
         * Dictionnary provided by the user to store custom objects
         * @property context
         * @type Object
         */
        this.context = _options.context || {};

        /**
         * Callback called on successful command execution
         * @property on_success
         * @type Function
         */
        this.on_success = _options.on_success ||
            successful_execution;

        /**
         * Callback called on successful command execution
         * @property on_failure
         * @type Function
         */
        this.on_failure = _options.on_failure ||
            failed_execution;

        /**
         * Used to Register and make commands
         * @property commands
         * @type Object
         */
        this.commands = new Commands();

        /**
         * Used to parse the user input
         * @property parser
         * @type Object
         */
        this.parser = new Parser();

        /**
         * Contains the successful commands as string
         * @property history
         * @type Array
         */
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
     * Default callback when a command is successully executed.
     * @method successful_execution
     * @param {Object} _result, DOM object
     * @private
     */
    var successful_execution = function (_result) {
        console.log(_result);
    };

    /**
     * Default callback when a command failed to execute.
     * @method failed_execution
     * @param {Object} _error, Error object with a message set
     * @private
     */
    var failed_execution = function (_error) {
        console.error(_error.message);
    };

    /**
     * Interpret the user input (if possible), by parsing it, searching
     * for the command, and then execute it with the arguments and
     * context set by the user when constructing JCli.
     * @method _interpret
     * @param {String} _text, the user input
     * @public
     */
    JCli.prototype.interpret = function (_text) {
        var commandOptions;

        //Parse the input
        try {
            commandOptions = this.parser.parse(_text);

            //Try to retrieve the command
            var command = this.commands.get_command(
                commandOptions.commandName
            );

            //TODO: Have get_command thow an exception instead
            if (command === undefined) {
                throw new Error(
                    'Cannot find command ' +
                    commandOptions.commandName
                );
            }

            //Validate the arguments
            this.parser.validate_arguments(
                command,
                commandOptions.args
            );

            //Add the context at the end of the arguments array
            commandOptions.args.push(this.context);
        }
        catch (e) {
            return this.on_failure(e);
        }

        //Keep the command in the history
        this.history.push(_text);

        //Finally: try to execute the 'exec' method
        Q.fcall(function () {
            return command.exec.apply(
                this,
                commandOptions.args
            );
        }).then(
            this.on_success,
            this.on_failure
        );
    };

    return JCli;

});
