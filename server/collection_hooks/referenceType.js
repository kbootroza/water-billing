import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_ReferenceType} from '../../imports/collection/referenceType';

WB_ReferenceType.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_ReferenceType, 3);
});


