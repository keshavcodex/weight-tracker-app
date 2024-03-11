import { View, Text, Pressable } from 'react-native';
import themeModal from '../theme/theme';

const SmallButton = ({ children, onPress, customStyle }: any) => {
  const theme = themeModal();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.primary,
          borderRadius: 10,
          width: '33%',
        },
        { ...customStyle },
      ]}>
      <Text
        style={{
          color: theme.black,
          fontSize: 20,
          textAlign: 'center',
          paddingTop: 6,
          paddingBottom: 8,
          paddingHorizontal: 5,
        }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default SmallButton;
