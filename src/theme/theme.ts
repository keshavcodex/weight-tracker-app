import { useColorScheme } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const lightColor = {
  dark: false,
  main: '#db790950',
  primary: '#db7909',
  fullColor: '#fff',
  fullColorInverse: '#000',
};
const darkColor = {
  dark: true,
  main: '#241300',
  primary: '#fff',
  fullColor: '#000',
  fullColorInverse: '#fff',
};
const themeModal = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const neutralColor = {
    yellow: 'yellow',
    skin: '#f0c089',
    sandybrown: '#f4a560',
    orange: '#db7909',
    red: '#ff0000',
    brown: '#A52A2A',
    maroon: '#800000',
    seaGreen: '#43f7d0',
    forestGreen: '#228B22',
    green: 'green',
    skyBlue: '#00bbf2',
    blue: 'blue',
    purple: 'purple',
    voilet: '#8d70ff',
    black: '#000',
    white: '#fff',
    smoke: '#848884',
    orangisGrey: '#5c534c',
  };
  return { ...lightColor, ...neutralColor };
  // return isDarkMode
  //   ? { ...darkColor, ...neutralColor }
  //   : { ...lightColor, ...neutralColor };
};

export default themeModal;
