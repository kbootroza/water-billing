
//Collection
import {WB_Tariff} from '../../imports/collection/tariff'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const TariffTabular = new Tabular.Table({
    name: "wb.tariffTabular",
    collection: WB_Tariff,
    columnDefs: [
        {"width": "10px", "targets": 8}
    ],
    columns: [
        {data: "_id", title: "No"},
        {data: "code", title: "Code"},
        {data: "startDate", title: "Start Date" ,
            render: function (val, type ,doc) {
               return moment(val).format("DD/MM/YYYY")
            }
        },
        {data: "categoryId", title: "Category"},
        {data: "typeId", title: "Type"},
        {data: "measureId", title: "Unit Of Measure"},
        {data: "floorById", title: "Floor By"},
        {data: "isFixedFloor", title: "Fixed Floor"},

        {
            tmpl: Meteor.isClient && Template.wb_actionRemove
        }
    ]
});