/**
 * Keeps a registry of all the available commands
 * @class Commands
 * @author Pierre Guillemot
 */
define([], function () {
    "use strict";

    /**
     * Constructor
     * @method Commands
     * @public
     */
    var Commands = function () {
        /**
         * Array which will contains all the commands
         * @property commands
         * @type Object<String, Object>
         */
        var commands = {};

        /**
         * Getter for commands
         * @method _get_commands
         * @return {Object} commands
         * @public
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

        this._get_commands().push(_command);
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

    return Commands;
});
