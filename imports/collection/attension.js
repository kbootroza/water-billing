/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const WB_Attension = new Mongo.Collection("wb_attension");

WB_Attension.schema = new SimpleSchema({

    code: {
        type: String,
        label: "Code"
    },
    descKhmer: {
        type: String,
        label: "Desc Khmer",
        optional: true
    },
    description: {
        type: String,
        label: "Description"
    }

});
/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Attension.attachSchema(WB_Attension.schema);
});


