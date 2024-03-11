import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import MainButton from '../components/MainButton';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addWeight } from '../services/apiActions/apiActions';
import { dateFormater } from '../utils/helper';

const AddWeight = ({ navigation }: any) => {
  const theme = themeModal();
  const today = new Date();
  const user = useSelector((state: any) => state.user.userInfo);
  const [userWeight, setUserWeight] = useState('');
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [selectedDate, setSelectedDate] = useState(dateString);

  const handleAddWeight = async () => {
    try {
      const body = {
        userId: user?._id,
        weight: parseFloat(userWeight),
        selectedDate,
      };
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
      <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: false,
            // selectedColor: 'blue'
          },
        }}
        theme={{
          calendarBackground: theme.dark ? '#8c4900' : theme.main,
          selectedDayBackgroundColor: theme.orange,
          arrowColor: theme.orange,
          textSectionTitleColor: theme.black,
          selectedDayTextColor: theme.black,
          monthTextColor: theme.fullColorInverse,
          todayTextColor: theme.black,
          dayTextColor: theme.white,
          textDisabledColor: theme.smoke,
        }}
      />
      <View
        style={{
          flexGrow: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{ fontSize: 19, alignSelf: 'center' }}>
          Your Weight on
          {'\n' + dateFormater(new Date(selectedDate))}
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
          style={{ fontSize: 19, marginVertical: 10, width: 100 }}
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
