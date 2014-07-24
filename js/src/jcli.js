/**
 * Main class, it is the entry point where the user input is
 * parsed and executed.
 * @class JCli
 * @author Pierre Guillemot
 */
define(['commands', 'parser'], function (Commands, Parser) {
    "use strict";

    /**
     * Constructor
     * @method JCli
     * @param {Object} _context, dictionnary of objects set by  the
     *                  api user.
     * @public
     */
    var JCli = function (_context) {
        this.context = _context;
        this.commands = new Commands();
        this.parser = new Parser();
        this.history = [];
    };

    /**
     * Add a command to JCli so that it can be interpreted.
     * @method add_command
     * @param {Object} _command, the command to add
     * @public
     */
    JCli.prototype.add_command = function (_command) {
        try {
            this.commands.register(_command);
        }
        catch (e) {
            console.error(e);
        }
    };

    /**
     * Execute the user input (if possible), by parsing it, searching
     * for the command, and then execute it with the arguments and
     * context set by the user when constructing JCli.
     * @method exec
     * @param {String} _text, the user input
     * @public
     */
    JCli.prototype.exec = function (_text) {
        var commandOptions;

        try {
            commandOptions = this.parser.parse(_text);
        }
        catch (e) {
            //TODO: Send the error to the view
            console.error(e);
            return;
        }

        var command = this.commands.get_command(
            commandOptions.commandName
        );

        if (command === undefined) {
            //TODO: Send the error to the view
            console.error('Cannot find command');
            return;
        }

        this.history.push(_text);

        //TODO: send the result to the view
        command.exec(
            commandOptions.args,
            this.context
        );
    };

    return JCli;

});
