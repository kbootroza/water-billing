import 'meteor/matb33:collection-hooks';
import {GeneralFunction} from '../../imports/api/methods/generalFunction.js';

// Collection
import {WB_Quartier} from '../../imports/collection/quartier';
import {WB_District} from '../../imports/collection/district';
WB_Quartier.before.insert(function (userId, doc) {
    let district = WB_District.findOne(doc.districtId);
    doc._id = GeneralFunction.generatePrefixId(WB_Quartier, `${doc.rolesArea}`, 2);
});


