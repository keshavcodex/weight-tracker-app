import {
  Agenda,
  Calendar,
  CalendarList,
  LocaleConfig,
} from 'react-native-calendars';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import MainButton from '../components/MainButton';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addNote } from '../services/apiActions/apiActions';
import { getAllNotes } from '../services/apiServices/noteApi';
import { dateFormater } from '../utils/helper';

const AddNote = ({ navigation }: any) => {
  const theme = themeModal();
  const today = new Date();
  const user = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useState('');
  // const [notes, setNotes] = useState('');
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [selectedDate, setSelectedDate] = useState(dateString);

  // useEffect(() => {
  //   fetchAllNotes();
  // }, []);

  // const fetchAllNotes = async () => {
  //   try {
  //     const response = await getAllNotes(user?._id);
  //     console.log(response[0].selectedDate);
  //     setNotes(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAddNote = async () => {
    try {
      const body = {
        userId: user?._id,
        page,
        selectedDate,
      };
      await addNote(body);
      //   navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Add Notes</HeaderText>
      {/* <Agenda
        selected={selectedDate}
        markToday
        scrollToNextEvent={false}
        items={{
          '2024-03-21': [notes[0]],
          '2024-03-20': [notes[1]],
          '2024-03-19': [notes[0]],
          '2024-03-18': [notes[1]],
          '2024-03-17': [notes[0]],
          '2024-03-16': [notes[1]],
          '2024-03-15': [notes[0]],
          '2024-03-14': [notes[1]],
          '2024-03-13': [notes[0]],
          '2024-03-12': [notes[1]],
        }}
        renderItem={(item, isFirst) => (
          <Pressable style={styles.item} onPress={handleAddNote}>
            <Text style={styles.itemText}>{item.page}</Text>
          </Pressable>
        )}
        theme={{
          calendarBackground: theme.primary,
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
      {/* <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
        }}
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
          calendarBackground: theme.main,
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
      <View
        style={{
          justifyContent: 'space-between',
          marginHorizontal: 5,
        }}>
        <Text
          style={{
            fontSize: 19,
            alignSelf: 'center',
            fontWeight: 500,
          }}>
          {dateFormater(new Date(selectedDate))}
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          value={page}
          textColor={theme.black}
          placeholder="Write notes..."
          mode="outlined"
          underlineColor={theme.primary}
          multiline
          // dense
          numberOfLines={page.length / 45 + 2}
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
            marginVertical: 10,
            paddingVertical: 10,
          }}
        />
      </View>

      <SmallButton
        customStyle={{
          marginVertical: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
        }}
        onPress={handleAddNote}>
        submit
      </SmallButton>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
});
