
//Collection
import {WB_District} from '../../imports/collection/district'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const DistrictTabular = new Tabular.Table({
    name: "wb.districtTabular",
    collection: WB_District,
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