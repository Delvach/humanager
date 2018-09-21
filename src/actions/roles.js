import * as ACTIONS from '../constants/actions';

export const loadRolesAction = () => {
  return {
    type: ACTIONS.LOAD_ROLES
  };
};

export const deleteRoleAction = id => {
  return {
    type: ACTIONS.DELETE_ROLE,
    payload: {
      id
    }
  };
};

export const deleteRolesAction = ids => {
  return {
    type: ACTIONS.DELETE_ROLES,
    payload: {
      ids
    }
  };
};

export const roleUpdateAction = ({ name, members, id }) => {
  console.log(name, members, id);
  return {
    type: ACTIONS.UPDATE_ROLE,
    payload: {
      name,
      members,
      id
    }
  };
};

export const roleCreatedAction = id => {
  return {
    type: ACTIONS.ROLE_CREATED,
    payload: {
      id
    }
  };
};

export const roleDeletedAction = id => {
  return {
    type: ACTIONS.ROLE_DELETED,
    payload: {
      id
    }
  };
};

export const rolesLoadedAction = (roles, allItemsKeys) => {
  return {
    type: ACTIONS.ROLES_LOADED,
    payload: {
      roles,
      allItemsKeys
    }
  };
};

export const roleLoadedAction = role => {
  return {
    type: ACTIONS.ROLE_LOADED,
    payload: {
      role
    }
  };
};

export const roleUpdatedAction = id => {
  return {
    type: ACTIONS.ROLE_UPDATED,
    payload: {
      id
    }
  };
};
