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
    'profile.approved': {
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
export const insertUser = new ValidatedMethod({
    name: 'wb.insertUser',
    validate: null,
    run(doc) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            // Add account'
            doc.profile.roles = doc.roles || [];
            doc.profile.areaId = doc.areaId;
            doc.profile.rolesBranch = doc.rolesBranch || [];
            let userId = Accounts.createUser({
                username: doc.username,
                email: doc.email,
                password: doc.password,
                profile: doc.profile,
                rolesBranch: doc.rolesBranch
            });

            // Add roles
            Roles.addUsersToRoles(userId,
                doc.roles, doc.areaId)
        }
    }
});
//
// // Update
export const updateUser = new ValidatedMethod({
    name: 'wb.updateUser',
    validate: null,
    run({modifier, _id}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }
            let doc = modifier.$set;
            console.log(doc);
            // Update account
            Meteor.users.update(_id, {
                $set: {
                    'emails.0.address': doc.email,
                    username: doc.username,
                    profile: {
                        approved: doc['profile.approved'],
                        status: doc.status
                    },
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
// Remove
export const removeUser = new ValidatedMethod({
    name: 'wb.removeUser',
    validate: null,
    run({userId}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            // Check no super
            let user = Meteor.users.findOne(userId);
            if (user && user.username == 'super') {
                throw new Meteor.Error("403", "Access denied");
            }

            Meteor.users.remove(userId);
        }
    }
});