import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib

export const UserSchema = new SimpleSchema({
    profile: {
        type: Object,
        label: 'Profile'
    },
    'profile.username': {
        type: String,
        label: 'Full Name'
    },
    username: {
        type: String,
        label: 'Username',
        unique: true,
        min: 3
    },
    email: {
        type: String,
        label: 'Email',
        unique: true,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        label: 'Password',
        min: 6
    },
    confirmPassword: {
        type: String,
        label: 'Comfirm Password',
        min: 6,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    },
    roles: {
        type: [String],
        label: 'Roles',
      
    },
    rolesBranch: {
        type: [String],
       
    }
});