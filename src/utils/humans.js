import {
  firstNames,
  adorableAvatarsParameters,
  materialUiColors
} from '../constants/faux';

import lastNames from '../constants/lastNames';

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

export const getFauxFirstName = randomNumber =>
  firstNames[Math.floor(randomNumber * firstNames.length)];

export const getFauxLastName = randomNumber =>
  firstNames[Math.floor(randomNumber * lastNames.length)];

export const getFauxHumansData = numItems => {
  const humans = [];
  for (let i = 0; i < numItems; i++) {
    // const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    // const firstName = firstNames[firstNameIndex];
    const firstName = getFauxFirstName(Math.random());
    const lastName = getFauxLastName(Math.random());
    humans.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}@delvach.com`,
      age: 18 + Math.floor(Math.random() * 30)
    });
  }
  return humans;
};

export const getFauxAvatarImageURL = ({ email, size }) =>
  `https://api.adorable.io/avatars/${size}/${email}.png`;

export const generateRandomFauxAvatarIcon = (color = '607D8B') => {
  const { eyes, noses, mouths } = adorableAvatarsParameters;

  const randomEyes = eyes[Math.floor(Math.random() * eyes.length)];
  const randomNose = noses[Math.floor(Math.random() * noses.length)];
  const randomMouth = mouths[Math.floor(Math.random() * mouths.length)];
  return `https://api.adorable.io/avatars/face/${randomEyes}/${randomNose}/${randomMouth}/${color}`;
};

export const generateRandomAvatarColor = () => {
  const { colors } = adorableAvatarsParameters;

  return colors[Math.floor(Math.random() * colors.length)];
};

export const pickRandomColor = () => {
  const colorsKeys = Object.keys(materialUiColors);

  const colorName = colorsKeys[Math.floor(Math.random() * colorsKeys.length)];
  const colorPalette = materialUiColors[colorName];

  const paletteKeys = Object.keys(colorPalette);
  const paletteVariant =
    paletteKeys[Math.floor(Math.random() * paletteKeys.length)];

  return colorPalette[paletteVariant];
};
