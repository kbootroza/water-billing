import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_District} from '../../imports/collection/district';

WB_District.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_District, 3);
});


