import * as ACTIONS from '../constants/actions';

export const loadHumansAction = () => {
  return {
    type: ACTIONS.LOAD_HUMANS
  };
};

// export const createHumanAction = name => {
//   return {
//     type: ACTIONS.CREATE_HUMAN,
//     payload: {
//       name
//     }
//   };
// };

export const deleteHumanAction = id => {
  return {
    type: ACTIONS.DELETE_HUMAN,
    payload: {
      id
    }
  };
};

// export const editHumanAction = id => {
//   return {
//     type: ACTIONS.EDIT_HUMAN,
//     payload: {
//       id
//     }
//   };
// };

export const humanCreatedAction = id => {
  return {
    type: ACTIONS.HUMAN_CREATED,
    payload: {
      id
    }
  };
};

export const humanDeletedAction = id => {
  return {
    type: ACTIONS.HUMAN_DELETED,
    payload: {
      id
    }
  };
};

export const humansLoadedAction = humans => {
  return {
    type: ACTIONS.HUMANS_LOADED,
    payload: {
      humans
    }
  };
};

export const humanLoadedAction = human => {
  return {
    type: ACTIONS.HUMAN_LOADED,
    payload: {
      human
    }
  };
};

export const humanUpdatedAction = id => {
  return {
    type: ACTIONS.HUMAN_UPDATED,
    payload: {
      id
    }
  };
};
