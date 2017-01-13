//import template js here
import '../../imports/ui/home/home';
import '../../client/layout';
//import layout render
require("materialize-css-meteor")
import {_Main} from '../libs/_renderLayout';


var waterBilling = FlowRouter.group({
  prefix: '/waterBilling',
  name: 'waterBilling',
  triggersEnter: [function(context, redirect) {
    console.log('running group triggers');
  }]
});

FlowRouter.route('/', {
    name: 'home',
    action: function(query,params){
        _Main('home');
    }
})