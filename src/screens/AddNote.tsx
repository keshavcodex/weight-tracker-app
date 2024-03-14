import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addNote } from '../services/apiActions/apiActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { longDateFormater } from '../utils/helper';
import { Calendar } from 'react-native-calendars';

const AddNote = ({ navigation, route }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useState('');
  const [undoPage, setUndoPage] = useState('');

  const pointedDate = route?.params?.pointedDate;

  const today = new Date();
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [selectedDate, setSelectedDate] = useState(pointedDate || dateString);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleAddNote = async () => {
    try {
      const body = {
        userId: user?._id,
        page,
        selectedDate,
      };
      const response = await addNote(body);
      if (response?.page || response?.acknowledged) {
        navigation.goBack();
      } else {
        console.log(response);
        Alert.alert('Notes updation failed', 'Please try again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Create Note</HeaderText>
      <View
        style={{
          justifyContent: 'space-between',
          marginHorizontal: 5,
        }}>
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
        <TextInput
          value={page}
          textColor={theme.black}
          placeholder="Write notes..."
          mode="outlined"
          underlineColor={theme.primary}
          multiline
          // dense
          numberOfLines={20}
          outlineColor={theme.primary}
          selectionColor={theme.primary}
          activeOutlineColor={theme.primary}
          activeUnderlineColor={theme.primary}
          cursorColor={theme.black}
          onChangeText={text => setPage(text)}
          style={{
            fontSize: 19,
            minHeight: 20,
            maxHeight: 500,
            marginTop: 10,
            paddingVertical: 10,
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {page.length < 1
            ? undoPage.length > 0 && (
                <Pressable
                  onPress={() => {
                    setPage(undoPage);
                    setUndoPage(page);
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.black,
                      paddingHorizontal: 10,
                      textDecorationLine: 'underline',
                    }}>
                    Undo
                  </Text>
                </Pressable>
              )
            : undoPage.length < 1 && (
                <Pressable
                  onPress={() => {
                    if (page.length > 0) {
                      setUndoPage(page);
                    }
                    setPage('');
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.black,
                      textDecorationLine: 'underline',
                      paddingHorizontal: 10,
                    }}>
                    Clear
                  </Text>
                </Pressable>
              )}
        </View>
      </View>

      <SmallButton
        customStyle={{
          marginVertical: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          width: '20%',
        }}
        onPress={handleAddNote}>
        save
      </SmallButton>
    </ScrollView>
  );
};

export default AddNote;
