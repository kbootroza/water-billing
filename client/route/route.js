//import template js here
import '../../imports/ui/home/home';
import '../../imports/ui/customer/customer';
import '../../imports/ui/customerType/customerType';
import '../../client/layout';
import '../../imports/ui/user/userSetting';
import '../../imports/ui/meter/meter';
//import func
import {CheckRoles} from '../../imports/api/methods/checkRoles';


//import layout render
require("materialize-css-meteor")
import {_Main} from '../libs/_renderLayout';


var waterBilling = FlowRouter.group({
    prefix: '/waterBilling',
    name: 'waterBilling',
    triggersEnter: [function (context, redirect) {
        console.log('running group triggers');
    }]
});

FlowRouter.route('/', {
    name: 'wb.home',
    action: function (query, params) {
        _Main('wb_home');
    }
})

//Customer
waterBilling.route('/customer', {
    name: 'wb.customer',
    action: function (query, params) {
        _Main('wb_customer');
    }
})

waterBilling.route('/customer/add', {
    name: 'wb.customerAdd',
    action: function (query, params) {
        _Main('wb_customerAdd');
    }
});

waterBilling.route('/customer/:customerId/edit', {
    name: 'wb.customerEdit',
    action: function (query, params) {
        _Main('wb_customerEdit');
    }
});

waterBilling.route('/customer/:customerId/detail', {
    name: 'wb.customerDetail',
    action: function (query, params) {
        _Main('wb_customerDetail');
    }
});


//User
waterBilling.route('/user-setting', {
    name: 'wb.userSetting',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main('wb_userSetting');
        } else {
            FlowRouter.go('wb.home');
        }
    }
});
waterBilling.route('/user-setting/new', {
    name: 'wb.userAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main('wb_userAdd');
        }else{
            FlowRouter.go('wb.home')
        }
    }
});
waterBilling.route('/user-setting/:userId/edit', {
    name: 'wb.userSettingEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main('wb_userSettingEdit');
        } else {
            FlowRouter.go('wb.home');
        }
    }
});

//Customer Type
waterBilling.route('/customerType', {
    name: 'wb.customerType',
    action: function (query, params) {
        _Main('wb_customerType');
    }
});
waterBilling.route('/customerType/:customerTypeId/edit', {
    name: 'wb.customerTypeEdit',
    action: function (query, params) {
        _Main('wb_customerTypeEdit');
    }
});

//Meter
waterBilling.route('/meter', {
    name: 'wb.meter',
    action: function (query, params) {
        _Main('wb_meter');
    }
});