import {View, Text, Pressable} from 'react-native';
import themeModal from '../theme/theme';

const MainButton = ({label, onPress}: any) => {
  const theme = themeModal();
  return (
    <Pressable onPress={onPress}>
      <View style={{backgroundColor: theme.skyBlue, borderRadius: 5}}>
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 8,
          }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default MainButton;
