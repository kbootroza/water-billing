import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

//Collection
import {WB_CustomerType} from '../../imports/collection/customerType'

Meteor.isClient && require('../../imports/ui/customerType/customerType.html');
export const CustomerTypeTabular = new Tabular.Table({
    name: "wb.customerTypeTabular",
    collection: WB_CustomerType,
    columns: [
        {data: "name", title: "En Name"},
        {data: "khname", title: "KH Name"},
        {data: "memo", title: "Memo"},
        {
            tmpl: Meteor.isClient && Template.wb_customerTypeOptions
        }
    ]
});