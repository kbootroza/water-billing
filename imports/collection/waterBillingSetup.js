/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_WaterBillingSetup= new Mongo.Collection("wb_waterBillingSetup");


WB_WaterBillingSetup.schema = new SimpleSchema({



});


WB_WaterBillingSetupGeneral= new SimpleSchema({



});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_WaterBillingSetup.attachSchema(WB_WaterBillingSetup.schema);
});


