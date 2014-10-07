/**
 * Keeps a registry of all the available commands
 * @class Commands
 * @author Pierre Guillemot
 */
define(['command'], function (Command) {
    "use strict";

    /**
     * Constructor
     * @method Commands
     * @public
     */
    var Commands = function () {
        /**
         * Dictionnary which will contains all the commands
         * @property commands
         * @type Object<String, Object>
         */
        var commands = {};

        /**
         * Getter for commands
         * @method _get_commands
         * @return {Object} commands
         * @private
         */
        this._get_commands = function () {
            return commands;
        };
    };
    
    /**
     * Adds a command inside the registry, throw an error if the
     * command is undefined or was already registered.
     * @method register
     * @param {Object} _command a command to register
     * @public
     */
    Commands.prototype.register = function (_command) {
        if (
            _command === undefined ||
            this.get_command(_command.get_name()) !== undefined
        ) {
            throw new Error(
                'This command is undefined or was already registered'
            );
        }

        this._get_commands()[_command.get_name()] = _command;
    };

    /**
     * Return a command by its name
     * @method get_command
     * @param {String} _name, name of the command
     * @return {Object} the command if found, undefined otherwise
     * @public
     */
    Commands.prototype.get_command = function (_name) {
        return this._get_commands()[_name];
    };

    /**
     * Factory method to create Command object from a dictionnary.
     * @method make_command
     * @param {Object} _command, object with the following fields set
                        name, description, params, exec
     * @return {Object} Command object
     * @public
     */
    Commands.prototype.make_command = function (_command) {
        //TODO: Add additional validation
        if (_command === undefined) {
            throw new Error(
                'Object undefined'
            );
        }

        var command = new Command(
            _command.name,
            _command.description,
            _command.params
        );
        command.exec = _command.exec;

        return command;
    };

    return Commands;
});
