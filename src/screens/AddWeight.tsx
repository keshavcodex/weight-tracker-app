import { Calendar } from 'react-native-calendars';
import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import HeaderText from '../components/HeaderText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addWeight } from '../services/apiActions/apiActions';
import { dateFormater, longDateFormater } from '../utils/helper';

const AddWeight = ({ navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [userWeight, setUserWeight] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const today = new Date();
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
      {/* <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        maxDate={dateString}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: false,
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
      /> */}
      <Pressable
        onPress={() => setCalendarVisible(!calendarVisible)}
        style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 19,
            alignSelf: 'center',
            fontWeight: '500',
            color: theme.fullColorInverse,
            paddingEnd: 10,
          }}>
          {longDateFormater(selectedDate)}
        </Text>
        <Ionicons name={'calendar-outline'} size={27} color={'#000'} />
      </Pressable>

      {calendarVisible && (
        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
            setCalendarVisible(false);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: false,
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
      )}
      <View
        style={{
          flexGrow: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 20,
        }}>
        {/* <Text
          style={{
            fontSize: 22,
            alignSelf: 'center',
            color: theme.fullColorInverse,
          }}>
          Add Weight
        </Text> */}
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
          width: '25%',
        }}
        onPress={handleAddWeight}>
        Add
      </SmallButton>
    </View>
  );
};

export default AddWeight;
