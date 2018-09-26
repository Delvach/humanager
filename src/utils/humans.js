import {
  firstNames,
  adorableAvatarsParameters,
  materialUiColors,
  titles
} from '../constants/faux';

import lastNames from '../constants/lastNames';

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/*
 * Human data is stored as as list of 'id' objects, with child objects for each field.
 * Flatten humans' data to include id to facilitate list display.
 */
export const normalizeAllHumansData = (allHumans = {}) => {
  const sortedHumans = [];
  for (const id in allHumans) {
    const human = allHumans[id];
    human.name = `${allHumans[id].nameFirst} ${allHumans[id].nameLast}`;
    // human.randomX = Math.random();
    // human.randomY = Math.random();
    sortedHumans.push({
      itemType: 'human',
      ...human,
      ...{ id }
    });
  }
  // console.log(sortedHumans);
  return sortedHumans;
};

export const normalizeHumansDataForSelect = humans =>
  humans.map(({ name, id }) => ({ text: name, value: id }));

export const getFauxFirstName = randomNumber =>
  firstNames[Math.floor(randomNumber * firstNames.length)];

export const getFauxLastName = randomNumber =>
  lastNames[Math.floor(randomNumber * lastNames.length)];

export const getFauxTitle = randomNumber => {
  const title = titles[Math.floor(randomNumber * titles.length)];

  return title
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};

export const getFauxHumansData = numItems => {
  const humans = [];
  for (let i = 0; i < numItems; i++) {
    const firstName = getFauxFirstName(Math.random());
    const lastName = getFauxLastName(Math.random());
    const title = getFauxTitle(Math.random());
    humans.push({
      name: `${firstName} ${lastName}`,
      nameFirst: firstName,
      nameLast: lastName,
      title,
      email: `${firstName.toLowerCase()}@delvach.com`,
      age: 18 + Math.floor(Math.random() * 30)
    });
  }
  return humans;
};

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
