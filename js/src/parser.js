/**
 * Parse the user's input and extract the information to
 * run the command with the given arguments (if any).
 * @class Parser
 * @author Pierre Guillemot
 */
define([], function () {
    "use strict";

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
            for (var i = 1; i < splittedText.length; i++) {
                args.push(splittedText[i]);
            }
        }

        return {
            commandName: commandName,
            args: args
        };
    };

    /**
     * Typechecking to verify if the parameter is a string
     * @method validate_string
     * @param {Any} _parameter, parameter to test
     * @return {String} returns back the same parameter
     * @private
     */
    var validate_string = function (_parameter) {
        if (typeof _parameter !== 'string') {
            throw new Error(
                _parameter + ' is not a string'
            );
        }

        return _parameter;
    };

    /**
     * Typechecking to verify if the parameter is a number
     * @method validate_number
     * @param {Any} _parameter, parameter to test
     * @return {String} returns the parsed parameter
     * @private
     */
    var validate_number = function (_parameter) {
        var parsedNumber = parseInt(_parameter, 10);

        if (isNaN(parsedNumber)) {
            throw new Error(
                _parameter + ' is not a number'
            );
        }

        return parsedNumber;
    };

    /**
     * Validate the command's arguments against those provided
     * by the user. Throws an error if the number of arguments
     * is incorrect or if the data type of a single argument
     * is incorrect.
     * @method validate_arguments
     * @param {Object} _command, the Command called by the user
     * @param {Array} _args, the arguments extracted by the
                        the method Parser.parse
     * @public
     */
    Parser.prototype.validate_arguments = function (_command, _args) {
        var params = _command.get_params();

        if (params.length !== _args.length) {
            throw new Error(
                'Incorrect usage of ' + _command.get_name()
            );
        }

        _args.forEach(function (element, index) {
            var type = params[index].type;

            //TODO: Constants for the types
            switch (type) {
                case 'string':
                    _args[index] = validate_string(element);
                    break;
                case 'number':
                    _args[index] = validate_number(element);
                    break;
                default:
                    throw new Error(
                        type +
                        ' is not a supported type'
                    );
            }
        });
    };

    return Parser;

});
