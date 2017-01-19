import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Customer} from '../../imports/collection/customer';

WB_Customer.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Customer, 9);
});


