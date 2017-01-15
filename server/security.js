import {WB_CustomerType} from '../imports/collection/customerType';



Security.permit(['insert','update','remove']).collections([
WB_CustomerType

]).apply();
