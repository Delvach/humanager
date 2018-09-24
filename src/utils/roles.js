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
