import './home.html';
import '../area/area';
let indexTmpl = Template.wb_home;

indexTmpl.helpers({
    notChoosenArea(){
        return _.isUndefined(Session.get('area'));
    }
});