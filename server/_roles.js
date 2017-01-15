import {Security} from 'meteor/ongoworks:security';
import {Roles} from 'meteor/alanning:roles';

// Setting
Security.defineMethod("wb_setting", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['setting']);
    },
    deny(type,arg,userId){
        if(!!userId) {
            return true
        }
    }
});

// Data Entry
Security.defineMethod("wb_write", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['write']);
    },
    deny(type,arg,userId){
        if(!!userId) {
            return true
        }
    }
});

Security.defineMethod("wb_update", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['update']);
    },
    deny(type,arg,userId){
        if(!!userId) {
            return true
        }
    }
});

Security.defineMethod("wb_remove", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['remove']);
    },
    deny(type,arg,userId){
        if(!!userId) {
            return true
        }
    }
});

// Report
Security.defineMethod("wb_read", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['read']);
    },
    deny(type,arg,userId){
        if(!!userId) {
            return true
        }
    }
});