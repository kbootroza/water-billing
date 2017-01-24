import {Meteor} from 'meteor/meteor';
import {WB_CustomerType} from "../imports/collection/customerType";
import {WB_Customer} from "../imports/collection/customer";
import {WB_Block} from "../imports/collection/block";
import {WB_Category} from "../imports/collection/category";
import {WB_Class} from "../imports/collection/class";
import {WB_District} from "../imports/collection/district";
import {WB_OperationCode} from "../imports/collection/operationCode";
import {WB_Position} from "../imports/collection/position";
import {WB_Quartier} from "../imports/collection/quartier";

//Customer Type
Meteor.publish('wb_customerTypeById', function wb_customerTypeById({_id}){
    if(this.userId){
        let doc =  WB_CustomerType.find({_id});
        return doc;
    }
    return this.ready();
});

//Customer
Meteor.publish('wb_customerById', function wb_customerById({_id}){
    if(this.userId){
        Meteor._sleepForMs(200);
        let doc =  WB_Customer.find({_id});
        return doc;
    }
    return this.ready();
});

//Block
Meteor.publish('wb_blockById', function wb_blockById({_id}){
    if(this.userId){
        let doc =  WB_Block.find({_id});
        return doc;
    }
    return this.ready();
});
//Category
Meteor.publish('wb_categoryById', function wb_categoryById({_id}){
    if(this.userId){
        let doc =  WB_Category.find({_id});
        return doc;
    }
    return this.ready();
});

//Class
Meteor.publish('wb_classById', function wb_classById({_id}){
    if(this.userId){
        let doc =  WB_Class.find({_id});
        return doc;
    }
    return this.ready();
});
//District
Meteor.publish('wb_districtById', function wb_districtById({_id}){
    if(this.userId){
        let doc =  WB_District.find({_id});
        return doc;
    }
    return this.ready();
});
//Operation Code
Meteor.publish('wb_operationCodeById', function wb_operationCodeById({_id}){
    if(this.userId){
        let doc =  WB_OperationCode.find({_id});
        return doc;
    }
    return this.ready();
});
//Position
Meteor.publish('wb_positionById', function wb_positionById({_id}){
    if(this.userId){
        let doc =  WB_Position.find({_id});
        return doc;
    }
    return this.ready();
});
//Quartier
Meteor.publish('wb_quartierById', function wb_quartierById({_id}){
    if(this.userId){
        let doc =  WB_Quartier.find({_id});
        return doc;
    }
    return this.ready();
});