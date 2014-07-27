/**
 * Demo to present JCli
 * @class Demo
 * @author Pierre Guillemot
 */
require(['jcli'], function (JCli) {
    "use strict";

    console.log(JCli);

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

    //Try to interpret the following:
    jcli.interpret('hello shawn');
    jcli.interpret('hell0 shawn');
    jcli.interpret('hello');

});
