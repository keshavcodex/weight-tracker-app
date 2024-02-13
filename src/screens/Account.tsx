import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import themeModal from '../theme/theme';
import GradientText from '../components/GradientText';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserInfo } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Account = () => {
  const user = useSelector((state: any) => state.user);
  const theme = themeModal();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(setUserInfo(''));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.main,
      }}>
      <GradientText
        style={{
          fontSize: 40,
          fontWeight: '600',
          textAlign: 'center',
        }}
        gradientHeight={18}
        colors={['blue', 'red']}>
        Hello, {user.firstName}.
      </GradientText>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '500' }}>
          Email: {user?.email}
        </Text>
      </View>
      <View>
        <AntDesign name="home" color={theme.blue} size={20} />
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center' }}>
        <MainButton label={'Logout'} onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Account;
