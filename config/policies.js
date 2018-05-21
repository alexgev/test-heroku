/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */
module.exports.policies = {
  AppController: {
    activeCount: ['isauth'],
    index: ['isauth'],
    destroy: ['requiredId', 'admin'],
    update: ['requiredId', 'admin'],
    create: ['isauth', 'admin'],
    get: ['isauth', 'requiredId'],
    disable: ['requiredId', 'admin'],
    getContentBundles: ['requiredId'],
    getPropertyBundles: ['requiredId']
  },
  CollaboratorController: {
    index: ['isauth'],
    set: ['requiredId', 'isauth'],
    get: ['isauth'],
    update: ['requiredId', 'requiredRole', 'isauth', 'admin'],
    disable: ['requiredId', 'isauth', 'admin']
  },
  ContentBundleController: {
    get: ['requiredId', 'isauth'],
    index: 'isauth',
    update: ['requiredId', 'isauth', 'managerAndAdmin'],
    create: ['isauth', 'managerAndAdmin'],
    destroy: ['requiredId', 'isauth', 'managerAndAdmin'],
    disable: ['requiredId', 'isauth', 'managerAndAdmin'],
    getContentUnits: ['requiredId', 'isauth']
  },
  ContentUnitController: {
    index: ['isauth'],
    destroy: ['requiredId', 'isauth'],
    update: ['requiredId', 'isauth'],
    get: ['requiredId', 'isauth'],
    disable: ['requiredId', 'isauth'],
    create: ['isauth']
  },
  PropertyBundleController: {
    get: ['requiredId', 'isauth'],
    index: ['isauth', 'admin'],
    update: ['requiredId', 'isauth'],
    create: ['isauth', 'admin'],
    destroy: ['requiredId', 'isauth', 'managerAndAdmin'],
    disable: ['requiredId', 'isauth', 'managerAndAdmin'],
    getProperties: ['requiredId', 'isauth']
  },
  PropertyController: {
    index: ['isauth'],
    destroy: ['requiredId', 'isauth'],
    update: ['requiredId', 'isauth'],
    get: ['requiredId', 'isauth'],
    disable: ['requiredId', 'isauth'],
    create: ['isauth']
  },
  UserController: {
    destroy: ['requiredId', 'isauth', 'admin'],
    update: ['requiredId', 'isauth', 'admin'],
    get: ['requiredId', 'isauth', 'admin'],
    disable: ['requiredId', 'isauth', 'admin'],
    updateMe: ['isauth'],
    create: ['isauth', 'admin'],
    index: ['isauth', 'admin']
  },
  // FileController: {
  //   '*': ['isauth']
  // },
  CounterController: {
    'index': ['isauth']
  }
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/
  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {
		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,
		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',
		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
