/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Tariff=new Mongo.Collection("wb_tariff");

WB_Tariff.schema = new SimpleSchema({

    code: {
        type: String,
        label: "Code"
    },
    startDate: {
        type: Date,
        label: "Start Date",
        autoform: {
            type: "pickadate"
        }
    },
    categoryId: {
        type: String,
        label: "Category"
    },
    typeId: {
        type: String,
        label: "Type"
    },
    measureId: {
        type: String,
        label: "Name"
    },
    floorBy: {
        type: String,
        label: "Floor By"
    },
    isFixedFloor: {
        type: Boolean,
        label: "Fixed Floor"
    }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Tariff.attachSchema(WB_Tariff.schema);
});


