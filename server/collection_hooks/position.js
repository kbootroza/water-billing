import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Position} from '../../imports/collection/position';

WB_Position.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Position, 3);
});


