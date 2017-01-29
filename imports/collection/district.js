/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const WB_District = new Mongo.Collection("wb_district");

WB_District.schema = new SimpleSchema({

    code: {
        type: String,
        label: "Code",
        index: true,
        unique: true
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
    WB_District.attachSchema(WB_District.schema);
});


