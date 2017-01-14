import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './layout.html';
import 'materialize-css/js/materialize.js';
import 'materialize-css/bin/materialize.css';
import 'lodash';
Template.navbar.onRendered(function(){
    $(".dropdown-button").dropdown();
    $(".enable-sidenav").sideNav();
});

Template.navbar.events({
    'click .logout'(event,instance){
        Session.set('area', undefined);
        Meteor.logout();
    }
});