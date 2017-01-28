/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const WB_ReferenceType = new Mongo.Collection("wb_referenceType");

WB_ReferenceType.schema = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }

});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_ReferenceType.attachSchema(WB_ReferenceType.schema);
});


