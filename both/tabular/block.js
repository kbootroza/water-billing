
//Collection
import {WB_Block} from '../../imports/collection/block'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const BlockTabular = new Tabular.Table({
    name: "wb.blockTabular",
    collection: WB_Block,
    columnDefs: [
        {"width": "10px", "targets": 4}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "districtCode", title: "District"},
        {data: "quartierCode", title: "Quartier"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});