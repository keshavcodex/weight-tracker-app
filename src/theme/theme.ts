import { useColorScheme } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const lightColor = {
  dark: false,
  main: '#30D5C850',
  primary: '#30D5C8',
  fullColor: '#fff',
  fullColorInverse: '#000',
};
const darkColor = {
  dark: true,
  main: '#013833',
  primary: '#30D5C8',
  fullColor: '#000',
  fullColorInverse: '#fff',
};
const themeModal = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const neutralColor = {
    yellow: 'yellow',
    green: 'green',
    blue: 'blue',
    purple: 'purple',
    black: '#000',
    white: '#fff'
  };

  return isDarkMode
    ? { ...darkColor, ...neutralColor }
    : { ...lightColor, ...neutralColor };
};

export default themeModal;
