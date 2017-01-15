import './userSetting.html';

//import tabular
import {UserSettingTabular} from '../../../both/tabular/userSetting';

let index = Template.wb_userSetting,
    userSettingOptions = Template.wb_userSettingOptions;
index.helpers({
    dataTable(){
        return UserSettingTabular;
    }
});

index.events({
    'dblclick tbody > tr' (event, instance) {
        let dataTalbe = $(event.currentTarget).closest('table').DataTable();
        let rowData = dataTalbe.row(event.currentTarget).data();
        console.log(rowData);
    }
});

userSettingOptions.onRendered(function () {
    $(".dropdown-button").dropdown();
});