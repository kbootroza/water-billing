/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Block=new Mongo.Collection("wb_block");

WB_Block.schema = new SimpleSchema({
    districtCode: {
        type: String,
        index: true,
        autoform:{
            type: 'select'
        }
    },
    quartierCode: {
        type: String,
        index: true,
        autoform: {
            type: 'select'
        }
    },
    code: {
        index: true,
        type: String,
        label: "Code"
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
    WB_Block.attachSchema(WB_Block.schema);
});


