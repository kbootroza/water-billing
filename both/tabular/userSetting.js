import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/user/userSetting.html');
export const UserSettingTabular = new Tabular.Table({
    name: "wb.userSettingTabular",
    collection: Meteor.users,
    columns: [
        {data: "profile.username", title: "Username"},
        {data: "profile.isApproved", title: "Approved"},
        // {data: "copies", title: "Copies Available"},
        // {
        //     data: "lastCheckedOut",
        //     title: "Last Checkout",
        //     render: function (val, type, doc) {
        //         if (val instanceof Date) {
        //             return moment(val).calendar();
        //         } else {
        //             return "Never";
        //         }
        //     }
        // },
        {data: "summary", title: "Summary"},
        {
            tmpl: Meteor.isClient && Template.wb_userSettingOptions
        }
    ]
});