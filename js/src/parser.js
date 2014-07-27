/**
 * Parse the user's input and extract the information to
 * run the command with the given arguments (if any).
 * @class Parser
 * @author Pierre Guillemot
 */
define([], function () {

    /**
     * Constructor
     * @method Parser
     * @public
     */
    var Parser = function () {

    };

    /**
     * Parse the user input and returns the name of the command
     * as well as the parameters.
     * Throws an error if the input is undefined or empty.
     * @method parse
     * @param {String} _text the user input
     * @return {Object} A dictionnary with 2 keys:
     *              commandName: name of the command
     *              args: the arguments if any
     */
    Parser.prototype.parse = function (_text) {
        if (_text === undefined || _text === '') {
            throw new Error(
                'Invalid input !'
            );
        }

        //Split the command using a single blank space
        var splittedText = _text.split(' ');

        var commandName = splittedText[0];

        var args = [];
        if (splittedText.length > 1) {
            splittedText.forEach(function (element, index, array) {
                //TODO: Find another way to start the loop from 1
                if (index > 0) {
                    args.push(element);
                }
            });
        }

        return {
            commandName: commandName,
            args: args
        };
    };

    return Parser;

});
