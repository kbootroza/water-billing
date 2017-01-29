import {Meteor} from 'meteor/meteor';
import {WB_District} from '../../../imports/collection/district';
import {WB_Quartier} from '../../../imports/collection/quartier';
import {WB_Block} from '../../../imports/collection/block';
Meteor.methods({
    fetchGeneralDistrictData(){
        if (Meteor.userId()) {
            let districts = WB_District.find();
            let list = [];
            districts.forEach(function (district) {
                list.push({label: `${district.code} | ${district.name}`, value: district.code});
            });
            return list;
        }
    },
    fetchQuartierByDistrictCodeId(districtCodeId){
        if (Meteor.userId()) {
            let quartiers = WB_Quartier.find({districtCodeId: districtCodeId});
            let list = [];
            quartiers.forEach(function (quartier) {
                list.push(
                    {
                        label: `${quartier.districtCodeId}${quartier.code} | ${quartier.name}`,
                        value: quartier.code
                    }
                );
            });
            return list;
        }
    },
    fetchBlockByQuartierCode(quartierCode){
        if(Meteor.userId()) {
            let blocks = WB_Block.find({quartierCode: quartierCode});
            let list = [];
            blocks.forEach(function (block) {
                list.push({label: `${block.code} | ${block.name}`, value: block.code});
            });
            return list;
        }
    }
});