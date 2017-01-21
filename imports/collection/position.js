/**
 * Created by snr on 1/15/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';



export const WB_Position=new Mongo.Collection("wb_position");

WB_Position.schema = new SimpleSchema({

    code: {
        type: String,
        label: "Code"
    },
    name: {
        type: String,
        label: "Name"
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
    WB_Position.attachSchema(WB_Position.schema);
});


