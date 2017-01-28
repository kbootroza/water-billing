
//Collection
import {WB_ReferenceType} from '../../imports/collection/referenceType'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const ReferenceTypeTabular = new Tabular.Table({
    name: "wb.referenceTypeTabular",
    collection: WB_ReferenceType,
    columnDefs: [
        {"width": "10px", "targets": 3}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});