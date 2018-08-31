export const spawnHuman = numHumans => {
  return {
    name: 'New Guy',
    id: numHumans
  };
};

/*
 * Human data is stored as as list of 'id' objects, with child objects for each field.
 * Flatten humans' data to include id to facilitate list display.
 */
export const normalizeAllHumansData = (allHumans = {}) => {
  const sortedHumans = [];
  for (const id in allHumans) {
    const human = allHumans[id];
    sortedHumans.push({
      ...human,
      ...{ id }
    });
  }

  return sortedHumans;
};

export const normalizeHumanData = human => {
  return human;
};

export const normalizeCreateHumanData = ({
  name = '',
  email = '',
  age = ''
}) => ({
  name,
  email,
  age
});
