import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import themeModal from '../theme/theme';
import MainButton from '../components/MainButton';
import { login } from '../services/authService/authApi';
import CustomInput from '../components/FormInput';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { err } from 'react-native-svg';

const Login = ({ navigation }: any) => {
  const theme = themeModal();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    checkUserInLocal();
  }, []);

  const checkUserInLocal = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfo');
      console.log('login k time user?', user);
      if (user != null) dispatch(setUserInfo(JSON.parse(user || '')));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    setIsLogging(true);
    try {
      const response = await login({ email, password });
      await AsyncStorage.setItem('userInfo', JSON.stringify(response));
      console.log('response', response);
      dispatch(setUserInfo(response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsLogging(false);
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
        <TextInput
          label="Email"
          mode="outlined"
          outlineColor={theme.primary}
          keyboardType="email-address"
          activeOutlineColor={theme.primary}
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.primary}
          value={password}
          secureTextEntry={secure}
          onChangeText={text => setPassword(text)}
          style={{ marginBottom: 10 }}
          right={
            <TextInput.Icon
              onPress={() => setSecure(!secure)}
              icon={secure ? 'eye-off' : 'eye'}
            />
          }
        />
        {isLogging ? (
          <View style={{ marginTop: 5 }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : (
          <View style={{ marginTop: 5 }}>
            <MainButton onPress={handleLogin}>Login</MainButton>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: theme.fullColorInverse,
          }}>
          Create new account
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
