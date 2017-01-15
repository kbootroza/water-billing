import {WB_CustomerType} from '../imports/collection/customerType';
import {WB_Meters} from '../imports/collection/meter';



Security.permit(['insert','update','remove']).collections([
WB_CustomerType,
WB_Meters
]).apply();

