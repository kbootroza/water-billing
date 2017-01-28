//Collection
import {VW_Reference} from '../../imports/collection/reference'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const ReferenceTabular = new Tabular.Table({
    name: "wb.referenceTabular",
    collection: VW_Reference,
    columnDefs: [
        {"width": "10px", "targets": 5}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            data: "referenceTypeDoc.name", title: "Reference Type"
        },

        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});