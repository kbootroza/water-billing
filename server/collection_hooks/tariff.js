import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Tariff} from '../../imports/collection/tariff';

WB_Tariff.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Tariff, 3);
});


