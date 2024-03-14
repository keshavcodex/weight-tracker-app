import { View, Text, Pressable } from 'react-native';
import themeModal from '../theme/theme';
import { ReactNode } from 'react';

interface CustomStyle {
  color?: string;
  backgroundColor?: string;
  borderRadius?: string | number;
  borderWidth?: 0.5;
  width?: string | number;
  marginVertical?: string | number;
  margint?: string | number;
  marginRight?: string | number;
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
}
interface TextStyle {
  alignSelf?: string | 'center';
  backgroundColor?: string;
  borderRadius?: string | number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  marginVertical?: string | number;
  margint?: string | number;
  marginRight?: string | number;
  paddingBottom?: number | string;
  paddingHorizontal?: number | string;
  paddingTop?: number | string;
  textAlign?: string | 'center';
  width?: string | number;
}

interface SmallButtonINF {
  children?: ReactNode;
  onPress?: any;
  customStyle?: CustomStyle;
  textStyle?: TextStyle;
}

const SmallButton = ({
  children,
  onPress,
  customStyle,
  textStyle,
}: SmallButtonINF) => {
  const theme = themeModal();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.primary,
          borderRadius: 25,
          width: '33%',
        },
        { ...customStyle },
      ]}>
      <Text
        style={[
          {
            color: theme.black,
            fontSize: 20,
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 8,
            paddingHorizontal: 5,
          },
          { ...textStyle },
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default SmallButton;
