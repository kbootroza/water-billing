
//Collection
import {WB_Customer} from '../../imports/collection/customer'

Meteor.isClient && require('../../imports/ui/actionButtons/actionButton.html');

export const CustomerTabular = new Tabular.Table({
    name: "wb.customerTabular",
    collection: WB_Customer,
    columnDefs: [
        {"width": "30px", "targets": 10}
    ],
    columns: [
        {data: "dpc", title: "DPC"},
        {data: "name", title: "En Name"},
        {data: "khName", title: "KH Name"},
        {data: "district", title: "District"},
        {data: "quartier", title: "Quartier"},
        {data: "operationType", title: "Operation Type"},
        {data: "streetNo", title: "Street No"},
        {data: "address", title: "Address"},
        {data: "phoneNumber", title: "Phone Number"},
        {data: "contact", title: "Contact"},
        {
            tmpl: Meteor.isClient && Template.wb_actionEditRemove
        }
    ]
});