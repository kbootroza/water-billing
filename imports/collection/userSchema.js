import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib

export const UserSchema = new SimpleSchema({
    profile: {
        type: Object,
        label: 'Profile'
    },
    'profile.fullName': {
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
        min: 6,
        optional: true
    },
    confirmPassword: {
        type: String,
        label: 'Comfirm Password',
        min: 6,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
        optional: true
        
    },
    roles: {
        type: [String],
        label: 'Roles',
        autoform: {
            multiple: true,
            type: 'select',
            options(){
                return [
                    {label: 'Setting',value: 'setting'},
                    {label: 'Write',value: 'write'},
                    {label: 'Read',value: 'read'},
                    {label: 'Update',value: 'update'},
                    {label: 'Remove',value: 'remove'},
                ]
            }
        }
    },
    rolesBranch: {
        type: [String],
        label: 'Roles Branch',
        autoform: {
            multiple: true,
            type: 'select',
            options(){
                return [
                    {label: 'Battambang',value: '02'},
                ]
            }
        }
       
    },
    areaId: {
        type: String,
        optional: true
    }
});