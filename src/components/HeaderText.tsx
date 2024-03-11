import { View, Text, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeModal from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const HeaderText = (props: any) => {
  const { children, left, right = false } = props;
  const navigation = useNavigation();
  const theme = themeModal();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 12,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        {left && (
          <AntDesign name="left" color={theme.fullColorInverse} size={20} />
        )}
      </Pressable>
      <Text style={{ fontSize: 20 }}>{children}</Text>
      <Pressable>
        {right && (
          <AntDesign name="right" color={theme.fullColorInverse} size={20} />
        )}
      </Pressable>
    </View>
  );
};

export default HeaderText;
