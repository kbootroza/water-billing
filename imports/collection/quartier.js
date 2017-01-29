/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Quartier=new Mongo.Collection("wb_quartier");

WB_Quartier.schema = new SimpleSchema({
    districtCodeId:{
        type: String,
        autoform: {
            type: 'select'
        }
    },
    code: {
        type: String,
        label: "Code",
        unique: true,
        index: true
    },
    name: {
        type: String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    rolesArea: {
        type: String,
        optional: true
    }

});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Quartier.attachSchema(WB_Quartier.schema);
});


