import './userSetting.html';

//import tabular
import {UserSettingTabular} from '../../../both/tabular/userSetting';

let index = Template.wb_userSetting;

index.helpers({
    dataTable(){
        return UserSettingTabular;
    }
});