import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from  'meteor/alanning:roles';
import 'lodash';
//
// Validate schema
let validateSchema = new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    profile: {
        type: Object
    },
    'profile.name': {
        type: String
    },
    'profile.aproved': {
        type: Boolean
    },
    roles: {
        type: [String]
    },
    rolesArea: {
        type: [String]
    }
});
//
// // Insert
// export const insertUser = new ValidatedMethod({
//     name: 'wb.insertUser',
//     validate: validateSchema.validator(),
//     run(doc) {
//         if (!this.isSimulation) {
//             // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
//             //     throw new Meteor.Error("403", "Access denied");
//             // }
//
//             // Add account
//             let userId = Accounts.createUser({
//                 username: doc.username,
//                 email: doc.email,
//                 password: doc.password,
//                 profile: doc.profile,
//                 rolesBranch: doc.rolesBranch
//             });
//
//             // Add roles
//             _.each(doc.roles, function (element) {
//                 let roleWords = _.words(element, /[^:]+/g);
//                 Roles.addUsersToRoles(userId,
//                     roleWords[1],
//                     roleWords[0]);
//             });
//         }
//     }
// });
//
// // Update
export const updateUser = new ValidatedMethod({
    name: 'wb.updateUser',
    validate:null,
    run({modifier, _id}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }
            let doc = modifier.$set;

            // Update account
            Meteor.users.update(_id, {
                $set: {
                    'emails.0.address': doc.email,
                    username: doc.username,
                    profile: {name: doc['profile.name']},
                    rolesBranch: doc.rolesBranch,
                    roles: {}
                }
            });

            // Update password
            if (doc.password && doc.password != '') {
                Accounts.setPassword(_id, doc.password);
            }
            // Update roles
            Roles.addUsersToRoles(_id, doc.roles, doc.areaId)
        }
    }
});
//
// // Remove
// export const removeUser = new ValidatedMethod({
//     name: 'wb.removeUser',
//     validate: new SimpleSchema({
//         userId: {type: String}
//     }).validator(),
//     run({userId}) {
//         if (!this.isSimulation) {
//             // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
//             //     throw new Meteor.Error("403", "Access denied");
//             // }
//
//             // Check no super
//             let user = Meteor.users.findOne(userId);
//             if (user.username == 'super') {
//                 throw new Meteor.Error("403", "Access denied");
//             }
//
//             Meteor.users.remove(userId);
//         }
//     }
// });