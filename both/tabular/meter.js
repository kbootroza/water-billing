import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

//Collection
import {WB_Meters} from '../../imports/collection/meter'

Meteor.isClient && require('../../imports/ui/meter/meter.html');
export const MeterTabular = new Tabular.Table({
    name: "wb.meterTabular",
    collection: WB_Meters,
    columnDefs: [
        {"width": "10px", "targets": 3}
    ],
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "En Name"},
        {data: "size", title: "Size"},
        {data: "memo", title: "Memo"},
        {data: "maintenanceFee", title: "Maintenance Fee"},
        {
            tmpl: Meteor.isClient && Template.wb_meterOptions
        }
    ]
});