import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Reference} from '../../imports/collection/reference';

WB_Reference.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Reference, 3);
});


