import {Meteor} from 'meteor/meteor';
import 'lodash';
Meteor.methods({
    _getUser({_id}){
        Meteor._sleepForMs(500);
        if (Meteor.userId()) {
            let user = Meteor.users.findOne({_id});
            if(user.emails.length > 0) {
                user.email = user.emails[0].address;
            }
            if (user.roles) {
                for(let k in user.roles) {
                    if(user.roles[k]) {
                        user.roles = user.roles[k];
                    }
                }
            }
            console.log(user);
            return user;
        }
        return []
    }
});