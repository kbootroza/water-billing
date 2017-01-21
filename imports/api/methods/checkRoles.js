export const CheckRoles = ({roles}) => {
    let currentUser = Meteor.user();
    if(currentUser.username == 'super') {
        return Roles.userIsInRole(currentUser._id, roles);
    }
    if(currentUser) {
        return Roles.userIsInRole(currentUser._id, roles, 'wb');
    }
};