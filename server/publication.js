import {Meteor} from 'meteor/meteor';
Meteor.publish('meteorUser', function meteorUser({_id}){
    if(this.userId){
        let user =  Meteor.users.find({_id});
        return user;
    }
    return this.ready();
});