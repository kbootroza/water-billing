import './home.html';
import '../area/area';
let indexTmpl = Template.home;

indexTmpl.helpers({
    notChoosenArea(){
        console.log(_.isUndefined(Session.get('area')));
        return _.isUndefined(Session.get('area'));
    }
});