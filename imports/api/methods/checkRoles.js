export const CheckRoles = ({roles, group}) => {
    let userId = Meteor.userId();
    if (!group) {
        return Roles.userIsInRole(userId, roles)
    } else {
        return Roles.userIsInRole(userId, roles, group)
    }
};