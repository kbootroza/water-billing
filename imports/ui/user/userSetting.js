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

userSettingOptions.onRendered(function () {
    $(".dropdown-button").dropdown();
});