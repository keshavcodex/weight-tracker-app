import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import themeModal from '../theme/theme';
import GradientText from '../components/GradientText';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/store';

const Account = () => {
  const user = useSelector((state: any) => state.user.userInfo);
  const theme = themeModal();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      AsyncStorage.clear();
      dispatch(logout());
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert(
        'Logout Error',
        'An error occurred while logging out. Please try again.',
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.main,
      }}>
      <GradientText
        style={{
          fontSize: 35,
          fontWeight: '600',
          textAlign: 'center',
        }}
        gradientHeight={18}
        colors={[
          theme.dark ? theme.white : theme.blue,
          theme.dark ? theme.yellow : 'red',
        ]}>
        Hello, {user?.firstName}.
      </GradientText>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '500', color: theme.fullColorInverse }}>
          Email: {user?.email}
        </Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center' }}>
        <MainButton onPress={handleLogout}>Logout</MainButton>
      </View>
    </View>
  );
};

export default Account;
