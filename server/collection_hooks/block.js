import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Block} from '../../imports/collection/block';

WB_Block.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Block, 3);
});


