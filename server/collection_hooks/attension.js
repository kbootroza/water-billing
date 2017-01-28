import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Attension} from '../../imports/collection/attension';

WB_Attension.before.insert(function (userId, doc) {
    doc._id = GeneralFunction.generateId(WB_Attension, 3);
});


