import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Meters} from '../../imports/collection/meter';

WB_Meters.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Meters, 3);
});


