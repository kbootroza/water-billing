import './area.html';
let indexTmpl = Template.waterBilling_area;
//import schema
import {areaSchema} from '../../collection/area';
indexTmpl.onCreated(function () {
    this.areaOption = new ReactiveVar([]);
    this.autorun(() => {
        Meteor.call('getRolesBranchList', (err, result) => {
            console.log(result);

            if (result) {
                this.areaOption.set(result);
            }
        });
    });
});

indexTmpl.helpers({
    areaOptions(){
        let instance = Template.instance();
        return instance.areaOption.get();
    },
    schema() {
        return areaSchema;
    }
});

AutoForm.hooks({
    area: {
        onSubmit(doc) {
            if (doc.area != '') {
                Session.set('area', doc.area);
            }
            return false;
        }
    }
})