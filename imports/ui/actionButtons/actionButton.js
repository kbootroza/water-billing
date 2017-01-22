import './actionButton.html'

let indexActionAdd = Template.wb_actionAdd,
    indexActionEdit = Template.wb_actionEdit;

indexActionAdd.events({
     'click .sumitForm'(event,instance){
        FlowRouter.query.set({s: 'true'});
    }
});

indexActionEdit.events({
     'click .sumitForm'(event,instance){
        FlowRouter.query.set({s: 'true'});
    }
});