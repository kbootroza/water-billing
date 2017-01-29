
//Collection
import {WB_Quartier} from '../../imports/collection/quartier'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const QuartierTabular = new Tabular.Table({
    name: "wb.quartierTabular",
    collection: WB_Quartier,
    columnDefs: [
        {"width": "10px", "targets": 4}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "districtCodeId", title: "District"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});