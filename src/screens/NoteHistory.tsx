import { Agenda, Calendar, LocaleConfig } from 'react-native-calendars';
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

const NoteHistory = ({ navigation }: any) => {
  const theme = themeModal();
  const today = new Date();
  const user = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useState('');
  const [items, setItems] = useState({});
  const [notes, setNotes] = useState('');
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [selectedDate, setSelectedDate] = useState(dateString);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await getAllNotes(user?._id);
      setNotes(response);
      // let itemList = {};
      // for(let i = 0; i < response.length; i++) {
      //   // let obj = {...response[i].selectedDate: '4er'};
      // }
      const items1 = response.reduce((acc, note) => {
        // Parse the selected date string into a JavaScript Date object
        const selectedDate = new Date(note.selectedDate);

        // Format the date as YYYY-MM-DD string
        const formattedDate = selectedDate.toISOString().slice(0, 10);

        // Add the note to the appropriate date in the accumulator
        if (acc[formattedDate]) {
          acc[formattedDate].push(note.page);
        } else {
          acc[formattedDate] = [note.page];
        }

        return acc;
      }, {});

      console.log(items1);
      setItems(items1);

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = async () => {
    try {
      // const body = {
      //   userId: user?._id,
      //   page,
      //   selectedDate,
      // };
      // await addNote(body);
      navigation.navigate('AddNote');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Notes List</HeaderText>
      <Agenda
        selected={selectedDate}
        // markToday
        // scrollToNextEvent={false}
        items={items}
        renderItem={(item: any, isFirst) => (
          <Pressable style={styles.item} onPress={handleAddNote}>
            <Text style={styles.itemText}>{item}</Text>
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
      />
      {/* <Calendar
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
      /> */}
      {/* <View
        style={{
          flexGrow: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{ fontSize: 19, alignSelf: 'center' }}>
          Notes on
          {'\n' + dateFormater(new Date(selectedDate))}
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          value={page}
          textColor={theme.black}
          mode="outlined"
          outlineColor={theme.primary}
          selectionColor={theme.primary}
          activeOutlineColor={theme.primary}
          activeUnderlineColor={theme.primary}
          cursorColor={theme.black}
          onChangeText={text => setPage(text)}
          style={{ fontSize: 19, marginVertical: 10, width: 100 }}
        />
      </View> */}

      <SmallButton
        customStyle={{
          marginVertical: 10,
          marginRight: 10,
          borderWidth: 0.5,
          borderRadius: 5,
          alignSelf: 'flex-end',
          width: 50,
        }}
        onPress={handleAddNote}>
        +
      </SmallButton>
    </View>
  );
};

export default NoteHistory;

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
