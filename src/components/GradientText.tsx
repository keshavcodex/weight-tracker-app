import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = ({ children, style, colors, ...props }: any) => {
  return (
    <MaskedView
      maskElement={
        <Text style={style} {...props}>
          {children}
        </Text>
      }>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 2 }}
        style={style}>
        <Text
          style={{ opacity: 18, paddingVertical: props?.gradientHeight || 10 }}
          {...props}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
