import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_CustomerType} from '../../imports/collection/customerType';

WB_CustomerType.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_CustomerType, 3);
});


