import { View, Text, Pressable } from 'react-native';
import themeModal from '../theme/theme';
import { ReactNode } from 'react';

interface customStyle {
  backgroundColor?: string;
  borderRadius?: string | number;
  borderWidth?: 0.5;
  width?: string | number;
  marginVertical?: string | number;
  margint?: string | number;
  marginRight?: string | number;
  alignSelf?: string;
}

interface SmallButtonINF {
  children: ReactNode;
  onPress: any;
  customStyle: customStyle;
}

const SmallButton = ({ children, onPress, customStyle }: SmallButtonINF) => {
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
