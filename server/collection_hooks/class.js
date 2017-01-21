import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Class} from '../../imports/collection/class';

WB_Class.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Class, 3);
});


