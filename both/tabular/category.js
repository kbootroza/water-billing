
//Collection
import {WB_Category} from '../../imports/collection/category'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const CategoryTabular = new Tabular.Table({
    name: "wb.categoryTabular",
    collection: WB_Category,
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