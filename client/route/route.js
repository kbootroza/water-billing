//import template js here
import '../../imports/ui/home/home';
import '../../imports/ui/customer/customer';
import '../../imports/ui/customerType/customerType';
import '../../client/layout';
import '../../imports/ui/user/userSetting';
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
    name: 'wb.home',
    action: function(query,params){
        _Main('wb_home');
    }
})

waterBilling.route('/customer', {
    name: 'wb.customer',
    action: function(query,params){
        _Main('wb_customer');
    }
})

waterBilling.route('/user-setting', {
   name: 'wb.userSetting',
    action: function(query,params) {
        _Main('wb_userSetting');
    }
});

waterBilling.route('/customerType', {
    name: 'wb.customerType',
    action: function(query,params){
        _Main('wb_customerType');
    }
})