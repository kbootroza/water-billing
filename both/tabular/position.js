
//Collection
import {WB_Position} from '../../imports/collection/position'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const PositionTabular = new Tabular.Table({
    name: "wb.positionTabular",
    collection: WB_Position,
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