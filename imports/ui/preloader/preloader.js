import './preloader.html';

let indexTmpl = Template.wb_preloader;

indexTmpl.helpers({
    onSumitForm(){
        let paramsSumit= FlowRouter.query.get('s');
        return !!paramsSumit;
    }
});