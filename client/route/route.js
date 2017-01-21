//import template js here
import '../../imports/ui/home/home';
import '../../imports/ui/customer/customer';
import '../../imports/ui/customerType/customerType';
import '../../client/layout';
import '../../imports/ui/user/userSetting';
import '../../imports/ui/meter/meter';
import '../../imports/ui/block/block';
import '../../imports/ui/category/category';
import '../../imports/ui/class/class';
import '../../imports/ui/district/district';
import '../../imports/ui/operationCode/operationCode';
import '../../imports/ui/position/position';
import '../../imports/ui/quartier/quartier';



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

//Customer
waterBilling.route('/customer', {
    name: 'wb.customer',
    action: function(query,params){
        _Main('wb_customer');
    }
})

waterBilling.route('/customer/add', {
    name: 'wb.customerAdd',
    action: function(query,params) {
        _Main('wb_customerAdd');
    }
});

waterBilling.route('/customer/:customerId/edit', {
    name: 'wb.customerEdit',
    action: function(query,params) {
        _Main('wb_customerEdit');
    }
});

waterBilling.route('/customer/:customerId/detail', {
    name: 'wb.customerDetail',
    action: function(query,params) {
        _Main('wb_customerDetail');
    }
});


//User
waterBilling.route('/user-setting', {
   name: 'wb.userSetting',
    action: function(query,params) {
        _Main('wb_userSetting');
    }
});
waterBilling.route('/user-setting/:userId/edit', {
   name: 'wb.userSettingEdit',
    action: function(query,params) {
        _Main('wb_userSettingEdit');
    }
});

//Customer Type
waterBilling.route('/customerType', {
    name: 'wb.customerType',
    action: function(query,params){
        _Main('wb_customerType');
    }
});
waterBilling.route('/customerType/:customerTypeId/edit', {
    name: 'wb.customerTypeEdit',
    action: function(query,params) {
        _Main('wb_customerTypeEdit');
    }
});

//Meter
waterBilling.route('/meter', {
    name: 'wb.meter',
    action: function(query,params){
        _Main('wb_meter');
    }
});

//Block
waterBilling.route('/block', {
    name: 'wb.block',
    action: function(query,params){
        _Main('wb_block');
    }
});
waterBilling.route('/block/:blockId/edit', {
    name: 'wb.blockEdit',
    action: function(query,params) {
        _Main('wb_blockEdit');
    }
});

//Block
waterBilling.route('/category', {
    name: 'wb.category',
    action: function(query,params){
        _Main('wb_category');
    }
});
waterBilling.route('/category/:categoryId/edit', {
    name: 'wb.categoryEdit',
    action: function(query,params) {
        _Main('wb_categoryEdit');
    }
});

//Class
waterBilling.route('/class', {
    name: 'wb.class',
    action: function(query,params){
        _Main('wb_class');
    }
});
waterBilling.route('/class/:classId/edit', {
    name: 'wb.classEdit',
    action: function(query,params) {
        _Main('wb_classEdit');
    }
});
//Class
waterBilling.route('/district', {
    name: 'wb.district',
    action: function(query,params){
        _Main('wb_district');
    }
});
waterBilling.route('/district/:districtId/edit', {
    name: 'wb.districtEdit',
    action: function(query,params) {
        _Main('wb_districtEdit');
    }
});
//operationCode
waterBilling.route('/operationCode', {
    name: 'wb.operationCode',
    action: function(query,params){
        _Main('wb_operationCode');
    }
});
waterBilling.route('/operationCode/:operationCodeId/edit', {
    name: 'wb.operationCodeEdit',
    action: function(query,params) {
        _Main('wb_operationCodeEdit');
    }
});
//position
waterBilling.route('/position', {
    name: 'wb.position',
    action: function(query,params){
        _Main('wb_position');
    }
});
waterBilling.route('/position/:positionId/edit', {
    name: 'wb.positionEdit',
    action: function(query,params) {
        _Main('wb_positionEdit');
    }
});
//quartier
waterBilling.route('/quartier', {
    name: 'wb.quartier',
    action: function(query,params){
        _Main('wb_quartier');
    }
});
waterBilling.route('/quartier/:quartierId/edit', {
    name: 'wb.quartierEdit',
    action: function(query,params) {
        _Main('wb_quartierEdit');
    }
});
