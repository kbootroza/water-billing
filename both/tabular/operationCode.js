
//Collection
import {WB_OperationCode} from '../../imports/collection/operationCode'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const OperationCodeTabular = new Tabular.Table({
    name: "wb.operationCodeTabular",
    collection: WB_OperationCode,
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