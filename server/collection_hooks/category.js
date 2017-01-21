import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Category} from '../../imports/collection/category';

WB_Category.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Category, 3);
});


