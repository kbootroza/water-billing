import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Quartier} from '../../imports/collection/quartier';

WB_Quartier.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Quartier, 3);
});


