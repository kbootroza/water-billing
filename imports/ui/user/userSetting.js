import './userSetting.html'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Template } from 'meteor/templating'
// import collection
import { UserSchema } from '../../collection/userSchema'
// import tabular
import { UserSettingTabular } from '../../../both/tabular/userSetting'

let index = Template.wb_userSetting,
  userSettingOptions = Template.wb_userSettingOptions,
  editTmpl = Template.wb_userSettingEdit
index.helpers({
  selector() {
    return {username: {$ne: 'super'}}
  },
  dataTable() {
    return UserSettingTabular
  }
})

index.events({
  'dblclick tbody > tr'(event, instance) {
    let dataTalbe = $(event.currentTarget).closest('table').DataTable()
    let rowData = dataTalbe.row(event.currentTarget).data()
    FlowRouter.go(`/waterBilling/user-setting/${rowData._id}/edit`)
  }
})

userSettingOptions.onRendered(function () {
  $('.dropdown-button').dropdown()
})

editTmpl.onCreated(function () {
  this.subUserReady = new ReactiveVar(false)
  this.autorun(() => {
    let paramUid = FlowRouter.getParam('userId')
    if (paramUid) {
      this.subscription = Meteor.subscribe('meteorUser', {_id: paramUid})
    }
  })
})

editTmpl.onRendered(function () {
  this.autorun(() => {
    if (this.subscription.ready()) {
      this.subUserReady.set(true)
    }
  })
})

editTmpl.helpers({
  subscriptionsReady() {
    let instance = Template.instance()
    return instance.subUserReady.get()
  },
  schema() {
    return UserSchema
  },
  data() {
    let paramUid = FlowRouter.getParam('userId')
    let user = Meteor.users.findOne(paramUid)
    if (user.emails.length > 0) {
      user.email = user.emails[0].address
    }
    return user
  },
  area(){
    return Session.get('area');
  }
})

AutoForm.hooks({
  wb_userEdit:{
    onSuccess(formType,result){
      Materialize.toast('Updated successfully', 3000, 'lime accent-4 rounded')
      FlowRouter.go('wb.userSetting')
    }
  }
})