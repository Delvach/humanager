import * as ACTIONS from '../constants/actions';

export const loadHumansAction = () => {
  return {
    type: ACTIONS.LOAD_HUMANS
  };
};

export const deleteHumanAction = (id, reloadList = true) => {
  return {
    type: ACTIONS.DELETE_HUMAN,
    payload: {
      id,
      reloadList
    }
  };
};

export const deleteHumansAction = ids => {
  return {
    type: ACTIONS.DELETE_HUMANS,
    payload: {
      ids
    }
  };
};

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
      humans,
      allItemsKeys: Object.keys(humans)
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
