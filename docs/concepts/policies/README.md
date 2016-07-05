## How to use policies with Hapi

### Fastest Way : Use Yeoman

```Bash
  yo trails:policy ExamplePolicy
```

With Yeoman you don't need to create the file and include it in index.js

### First Step : Write your policy

The convention is that policies has to be written in api/policies.

```JavaScript
/**
 * FILE: api/policies/Example.js
 */
 'use strict'
 const Policy = require('trails-policy')
 const Boom = require('boom')

 /**
  * @module ExamplePolicy
  * @description This is the example policy
  */
 module.exports = class ExamplePolicy extends Policy {
   test(request, reply) {
     const secret = request.params.secret
     // Your own logic
     /**
     * The following code is an example:
     * It stop when the secret parametter is not not equal to mysecret and continue to the Controller when secret is match
     */
     if (secret != 'mysecret') {
       // Reject if secret is not equal to 'mysecret'
       return reply(Boom.preconditionFailed(this.__('Secret invalid')))
     }
     // Continue to Example Controller
     reply()
   }
 }

```
### Second Step : Load your policy

```JavaScript
/**
 * FILE: api/policies/index.js
 */

 'use strict'

 module.exports = {}
 exports.Example = require('./Example')

```

### Third Step : Declare your policy in config the file

```JavaScript
/**
 * FILE: config/policies.js
 * The following Policies are example of what you can do with Trails Policies
 */

 module.exports = {

   // #-1 Apply on every controllers and functions if no policies are specified #1
   '*': ['ExamplePolicy.test'],

   ExampleController: {
     // #-2 Unique policy for one controller function
     test: [ 'ExamplePolicy.test' ],
     // #-3 Before accessing multiple function in ExampleController, processing multiple policies example:
     multiple: ['ExamplePolicy.test', 'ExamplePolicy.testfoo', 'ExamplePolicy.testbar'],
     // #-4 Override the global '*' (#1) and will be apply on every function of ExampleController
     '*': ['ExamplePolicy.test2']
   },
   /**
    * Controller Policies that applies on each function under a specific controller
    */

   DefaultController: ['AccessPolicy.logger']
 }
```
