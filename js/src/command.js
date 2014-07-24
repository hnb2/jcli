/**
 * Base class for all the commands, they must inherits this class
 * and override the exec method.
 * @class Command
 * @author Pierre Guillemot
 */
define([], function () {
    "use strict";

    /**
     * Constructor
     * @method Command
     * @param {String} _name        name of the command
     * @param {String} _description description of the command
     * @param {Array} _params       parameters of the command
     * @public
     */
    var Command = function (
        _name,
        _description,
        _params
    ) {
        /**
         * Name of the command
         * @property name
         * @type String
         */
        var name;

        /**
         * Description of the command, can be seen in the help
         * @property description
         * @type String
         */
        var description;

        /**
         * Parameters of the command, can be empty
         * @property params
         * @type Array
         */
        var params;

        /**
         * Getter for name
         * @method get_name
         * @return {String} name
         * @public
         */
        this.get_name = function () {
            return name;
        };

        /**
         * Getter for description
         * @method get_description
         * @return {String} description
         * @public
         */
        this.get_description = function () {
            return description;
        };

        /**
         * Getter for params
         * @method get_params
         * @return {Array} params
         * @public
         */
        this.get_params = function () {
            return params;
        };

        name = _name;
        description = _description;
        params = _params;
    };
   
    /**
     * This method should be overriden by all the child classes.
     * Contains the command's execution code, will be called by
     * JCLI.
     * @method exec
     * @param {Array} _args     arguments
     * @param {Object} _context dictionnary of objects used
     *      as a context, it is possible to pass custom ones.
     * @public
     */
    Command.prototype.exec = function (_args, _context) {
        throw new Error("Must be implemented !!!");
    };
    
    /**
     * Returns the help page for this command. Is currently
     * made solely of the description.
     * @method get_help_page
     * @return {String} the help page
     * @public
     */
    Command.prototype.get_help_page = function () {
        return this.get_description();
    };
   
    return Command;
});
