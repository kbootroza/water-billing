import {WB_Meters} from '../imports/collection/meter';


import {WB_CustomerType} from "../imports/collection/customerType";
import {WB_Customer} from "../imports/collection/customer";
import {WB_Block} from "../imports/collection/block";
import {WB_Category} from "../imports/collection/category";
import {WB_Class} from "../imports/collection/class";
import {WB_District} from "../imports/collection/district";
import {WB_OperationCode} from "../imports/collection/operationCode";
import {WB_Position} from "../imports/collection/position";
import {WB_Quartier} from "../imports/collection/quartier";
import {WB_Attension} from "../imports/collection/attension";
import {WB_ReferenceType} from "../imports/collection/referenceType";
import {WB_Reference} from "../imports/collection/reference";
import {WB_Tariff} from "../imports/collection/tariff";


Security.permit(['insert', 'update', 'remove']).collections([
    WB_CustomerType,
    WB_Customer,
    WB_Meters,
    WB_Block,
    WB_Category,
    WB_Class,
    WB_District,
    WB_OperationCode,
    WB_Position,
    WB_Quartier,
    WB_Attension,
    WB_ReferenceType,
    WB_Reference,
    WB_Tariff
]).apply();

