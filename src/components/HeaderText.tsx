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
        margin: 2,
      }}>
      {left ? (
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 12 }}>
          <AntDesign name="left" color={theme.fullColorInverse} size={20} />
        </Pressable>
      ) : (
        <View style={{ padding: 12 }}></View>
      )}
      <Text style={{ fontSize: 20, color: theme.orangisGrey }}>
        {children}
      </Text>
      {right ? (
        <Pressable style={{ padding: 12 }}>
          <AntDesign name="right" color={theme.fullColorInverse} size={20} />
        </Pressable>
      ) : (
        <View style={{ padding: 12 }}></View>
      )}
    </View>
  );
};

export default HeaderText;
