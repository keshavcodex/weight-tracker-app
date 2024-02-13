import { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(false);

  return (
    <View>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={hide}
        onChangeText={text => setPassword(text)}
      />
    </View>
  );
};

export default Register;
