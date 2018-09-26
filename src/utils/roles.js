import departments from '../constants/departments';

/*
 * Role data is stored as as list of 'id' objects, with child objects for each field.
 * Flatten roles' data to include id to facilitate list display.
 */
export const normalizeAllRolesData = (allRoles = {}) => {
  const sortedRoles = [];
  for (const id in allRoles) {
    const role = allRoles[id];
    // role.randomX = Math.random();
    // role.randomY = Math.random();
    if (!role.members) role.members = [];
    sortedRoles.push({
      itemType: 'role',
      ...role,
      ...{ id }
    });
  }

  return sortedRoles;
};

export const normalizeRoleData = (name = '', members = []) => ({
  name,
  members:
    members.length && typeof members[0] === 'object'
      ? members.map(human => human.value)
      : members
});

export const getFauxDepartmentName = randomNumber =>
  departments[Math.floor(randomNumber * departments.length)];

export const getRandomArrayElements = (arr, count) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

export const getFauxMembers = (randomNumber, ids) => {
  if (!ids.length) return [];
  let numIds = Math.floor(randomNumber * ids.length);

  if (numIds < 1) {
    numIds = 1;
  } else if (numIds > 5) {
    numIds = 5;
  }
  return getRandomArrayElements(ids, numIds);
};

export const getFauxRolesData = (numItems, humans) => {
  const roles = [];
  for (let i = 0; i < numItems; i++) {
    const name = getFauxDepartmentName(Math.random());
    const members = getFauxMembers(Math.random(), humans);
    roles.push({
      name,
      members
    });
  }
  return roles;
};
