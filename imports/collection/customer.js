/**
 * Created by snr on 1/15/17.
 */
import {
    Mongo
} from 'meteor/mongo';
import {
    SimpleSchema
} from 'meteor/aldeed:simple-schema';
import {
    AutoForm
} from 'meteor/aldeed:autoform';
import {
    moment
} from 'meteor/momentjs:moment';


export const WB_Customer = new Mongo.Collection("wb_customer");
Wb_locationSchema = new SimpleSchema({
    province: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    district: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    commune: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    village: {
        type: String,
        autoform: {
            type: 'select'
        }
    }
});
WB_Customer.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name*"
    },
    khName: {
        type: String,
        label: "Khmer Name*",
        optional: true

    },
    dpc: {
        type: String,
        label: "DPC",
        optional: true
    },
    district: {
        type: String,
        label: "District",
        optional: true,
        autoform: {
            type: "select"
        }
    },
    quartier: {
        type: String,
        label: "Quartier",
        optional: true,
        autoform: {
            type: 'select'
        }
    },
    block: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    folio: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    successor: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    category: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    activity: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    group: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    billingCycle: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    tariff: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    class: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    position: {
        type: String,
        autoform: {
            type: 'select',
            options(){
                return [
                        {label: 'Active', value: 'active'},
                        {label: 'Inactive', value: 'inactive'},
                    ]
            }
        }
    },
    operationCode: {
        type: String,
        label: "Operation Code",
        optional: true
    },
    streetNo: {
        type: String,
        label: "Street No",
        optional: true
    },
    address: {
        type: String,
        label: "Address",
        optional: true
    },
    phoneNumber: {
        type: String,
        label: "Phone Number",
        optional: true
    },
    contact: {
        type: String,
        label: "Contact",
        optional: true
    },
    location: {
        type: Wb_locationSchema
    }

});


/**
 * Attach schema
 */

Meteor.startup(function () {
    WB_Customer.attachSchema(WB_Customer.schema);
});