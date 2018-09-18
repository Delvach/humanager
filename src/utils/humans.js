import { firstNames } from '../constants/faux';
/*
 * Human data is stored as as list of 'id' objects, with child objects for each field.
 * Flatten humans' data to include id to facilitate list display.
 */
export const normalizeAllHumansData = (allHumans = {}) => {
  const sortedHumans = [];
  for (const id in allHumans) {
    const human = allHumans[id];
    // human.randomX = Math.random();
    // human.randomY = Math.random();
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

export const normalizeHumansDataForSelect = humans =>
  humans.map(({ name, id }) => ({ text: name, value: id }));

export const getFauxHumansData = numItems => {
  const humans = [];
  for (let i = 0; i < numItems; i++) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const firstName = firstNames[firstNameIndex];
    humans.push({
      name: firstName,
      email: `${firstName.toLowerCase()}@delvach.com`,
      age: 18 + Math.floor(Math.random() * 30)
    });
  }
  return humans;
};

export const getFauxAvatarImageURL = ({ email, size }) =>
  `https://api.adorable.io/avatars/${size}/${email}.png`;
