import { View, Text } from 'react-native';
import React, { useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import MainButton from '../components/MainButton';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addWeight } from '../services/apiActions/apiActions';

const AddWeight = ({ navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [userWeight, setUserWeight] = useState('');

  const handleAddWeight = async () => {
    try {
      const body = [
        {
          userId: user?._id,
          weight: parseFloat(userWeight),
        },
      ];
      await addWeight(body);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.main, paddingHorizontal: 10 }}>
      <HeaderText left>Add Weight</HeaderText>
      <View
        style={{
          flexGrow: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{ fontSize: 25, alignSelf: 'center', paddingBottom: 10 }}>
          Weight of {user?.firstName}:
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          value={userWeight}
          textColor={theme.black}
          mode="outlined"
          outlineColor={theme.primary}
          selectionColor={theme.primary}
          activeOutlineColor={theme.primary}
          activeUnderlineColor={theme.primary}
          cursorColor={theme.black}
          onChangeText={text => setUserWeight(text)}
          style={{ fontSize: 25, marginBottom: 10, width: 100 }}
        />
      </View>
      <SmallButton
        customStyle={{
          marginVertical: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
        }}
        onPress={handleAddWeight}>
        Add
      </SmallButton>
    </View>
  );
};

export default AddWeight;
