import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'materialize-css/js/materialize.js';
import 'materialize-css/bin/materialize.css';
import 'lodash';
import 'meteor/tap:i18n-ui';

//Page
import './layout.html';


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