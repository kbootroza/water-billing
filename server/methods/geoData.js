import {Meteor} from 'meteor/meteor';

Meteor.methods({
    fetchProvinces(){
        let list = [];
        let provinces = JSON.parse(Assets.getText('geoData/province.json'));
        provinces.forEach(function(province){
            list.push({label: `${province.properties.NAME1}`, value: `${province.properties.ADMIN_ID1}`});
        });
        return list;
    },
    fetchDistricts(adminId1){
        let list = [];
        let districts = JSON.parse(Assets.getText('geoData/district.json'));
        districts.map(function(o){
            if(o.properties.ADMIN_ID1 == adminId1){
                list.push({label: `${o.properties.NAME2}`, value: `${o.properties.ADMIN_ID2}`});
            }
        })
        return list;
    }
});