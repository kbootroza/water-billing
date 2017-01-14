import './area.html';
let indexTmpl = Template.waterBilling_area;
//import schema
import { areaSchema } from '../../collection/area';
indexTmpl.helpers({
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