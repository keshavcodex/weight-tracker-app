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
    orange: '#db7909',
    green: 'green',
    blue: 'blue',
    purple: 'purple',
    voilet: '#8d70ff',
    black: '#000',
    white: '#fff',
    smoke: '#848884',
    orangisGrey: '#5c534c'
  };

  return isDarkMode
    ? { ...darkColor, ...neutralColor }
    : { ...lightColor, ...neutralColor };
};

export default themeModal;
