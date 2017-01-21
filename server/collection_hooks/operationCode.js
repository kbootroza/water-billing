import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_OperationCode} from '../../imports/collection/operationCode';

WB_OperationCode.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_OperationCode, 3);
});


