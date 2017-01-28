
//Collection
import {WB_Attension} from '../../imports/collection/attension'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const AttensionTabular = new Tabular.Table({
    name: "wb.attensionTabular",
    collection: WB_Attension,
    columnDefs: [
        {"width": "10px", "targets": 4}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "code", title: "Code"},
        {data: "descKhmer", title: "Desc Khmer"},
        {data: "description", title: "Description"},
        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});