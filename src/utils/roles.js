/*
 * Role data is stored as as list of 'id' objects, with child objects for each field.
 * Flatten roles' data to include id to facilitate list display.
 */
export const normalizeAllRolesData = (allRoles = {}) => {
  const sortedRoles = [];
  for (const id in allRoles) {
    const role = allRoles[id];
    if (!role.members) role.members = [];
    sortedRoles.push({
      ...role,
      ...{ id }
    });
  }

  return sortedRoles;
};
