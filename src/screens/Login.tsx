import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import themeModal from '../theme/theme';
import MainButton from '../components/MainButton';
import { login } from '../services/authService/authApi';
import CustomInput from '../components/FormInput';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const theme = themeModal();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setHide] = useState(false);

  useEffect(() => {
    checkUserInLocal();
  }, []);

  const checkUserInLocal = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfo');
      dispatch(setUserInfo(JSON.parse(user) || ''));
    } catch (error) {}
  };

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      await AsyncStorage.setItem('userInfo', JSON.stringify(response));
      dispatch(setUserInfo(response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: theme.main,
      }}>
      <View style={{ marginTop: 20 }}>
        <CustomInput label="Email" value={email} setValue={setEmail} />
        <TextInput
          label="Password"
          mode="outlined"
          outlineColor={theme.skyBlue}
          activeOutlineColor={theme.skyBlue}
          value={password}
          secureTextEntry={secure}
          onChangeText={text => setPassword(text)}
          style={{ marginBottom: 10 }}
        />
        <View style={{ marginTop: 5 }}>
          <MainButton label="Login" onPress={handleLogin} />
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          Create new account
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
