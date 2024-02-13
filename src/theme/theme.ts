import {useColorScheme} from 'react-native';

const lightColor = {
  dark: false,
  main: '#30D5C850',
  fullColor: '#fff',
  fullColorInverse: '#000',
};
const darkColor = {
  dark: true,
  main: '#30D5C820',
  fullColor: '#000',
  fullColorInverse: '#fff',
};
const themeModal = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const neutralColor = {
    skyBlue: '#30D5C8',
    yellow: 'yellow',
    green: 'green',
    blue: 'green',
    purple: 'purple'
  };

  return isDarkMode ? {...darkColor, ...neutralColor} : {...lightColor, ...neutralColor};
};

export default themeModal;
