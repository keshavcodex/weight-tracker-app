import { View, Text, Pressable } from 'react-native';
import themeModal from '../theme/theme';

const MainButton = ({ children, onPress, customStyle }: any) => {
  const theme = themeModal();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          { backgroundColor: theme.primary, borderRadius: 10 },
          { ...customStyle },
        ]}>
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 8,
            color: theme.black
          }}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default MainButton;
