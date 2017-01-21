
//Collection
import {WB_Class} from '../../imports/collection/class'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const ClassTabular = new Tabular.Table({
    name: "wb.classTabular",
    collection: WB_Class,
    columnDefs: [
        {"width": "10px", "targets": 4}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});