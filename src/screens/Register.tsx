import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import themeModal from '../theme/theme';
import { useDispatch } from 'react-redux';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from '../store/store';
import { UserInfo, register } from '../services/authService/authApi';

const Register = ({ navigation }: any) => {
  const theme = themeModal();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const validateUser = (user: UserInfo) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    if (user.firstName.length < 2 || user.lastName.length < 2) {
      errors.push('First and Last name must be at least 2 characters.');
    }
    if (!user.email || !emailRegex.test(user.email)) {
      errors.push('Please enter a valid email address.');
    }
    if (user.phone.length < 10) {
      errors.push('Please enter a valid phone number.');
    }
    if (user.password.length < 6) {
      errors.push('Password must be at least 6 characters.');
    }
    if (user.password !== user.confirmPassword) {
      errors.push('Password mismatch with Confirm Password.');
    }
    if (errors.length > 0) {
      const combinedErrors = errors.join('\n\n');
      Alert.alert(
        'Validation Errors',
        combinedErrors,
        [
          {
            text: 'OK',
            // onPress: () => console.log('Alert dismissed')
          },
        ],
        { cancelable: true },
      );
      return false;
    } else return true;
  };

  const handleRegister = async () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
    };
    if (validateUser(user)) {
      setIsRegistering(true);
      try {
        const response = await register(user);
        console.log('response in register:', response);
        if (response?.email) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(response));
          dispatch(setUserInfo(response));
        } else {
          Alert.alert('Registration failed', 'Please try again');
        }
      } catch (error) {
        console.log('error of login', JSON.stringify(error, null, 2));
      }
      setIsRegistering(false);
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
        <TextInput
          label="First Name"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.orange}
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.orange}
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          outlineColor={theme.primary}
          keyboardType="email-address"
          activeOutlineColor={theme.orange}
          value={email}
          onChangeText={text => setEmail(text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Phone"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.orange}
          value={phone}
          onChangeText={text => setPhone(text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.orange}
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
        <TextInput
          label="Confirm Password"
          mode="outlined"
          outlineColor={theme.primary}
          activeOutlineColor={theme.orange}
          value={confirmPassword}
          secureTextEntry={secure}
          onChangeText={text => setConfirmPassword(text)}
          style={{ marginBottom: 10 }}
          right={
            <TextInput.Icon
              onPress={() => setSecure(!secure)}
              icon={secure ? 'eye-off' : 'eye'}
            />
          }
        />
        {isRegistering ? (
          <View style={{ marginTop: 5 }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : (
          <View style={{ marginTop: 5 }}>
            <MainButton onPress={handleRegister}>Register</MainButton>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: theme.fullColorInverse,
          }}>
          Aready have an account?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
