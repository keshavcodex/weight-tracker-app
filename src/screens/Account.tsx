import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import themeModal from '../theme/theme';
import GradientText from '../components/GradientText';

const Account = () => {
  const user = useSelector((state: any) => state.user);
  const theme = themeModal();

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
          Track your weight easily!
        </Text>
      </View>
    </View>
  );
};

export default Account;
