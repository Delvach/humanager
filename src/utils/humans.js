export const spawnHuman = numHumans => {
  return {
    name: 'New Guy',
    id: numHumans
  };
};

export const normalizeAllHumansData = (allHumans = {}) => {
  const sortedHumans = [];
  for (const key in allHumans) {
    const human = allHumans[key];
    sortedHumans.push({
      ...human,
      ...{ id: key }
    });
  }

  return sortedHumans;
};

export const normalizeHumanData = human => {
  return human;
};

export const normalizeCreateHumanData = ({ name, nickname }) => ({
  name: name.value,
  nickname: nickname.value
});
