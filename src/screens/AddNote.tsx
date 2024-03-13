import {
  Agenda,
  Calendar,
  CalendarList,
  LocaleConfig,
} from 'react-native-calendars';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import themeModal from '../theme/theme';
import { TextInput } from 'react-native-paper';
import MainButton from '../components/MainButton';
import HeaderText from '../components/HeaderText';
import { useSelector } from 'react-redux';
import SmallButton from '../components/SmallButton';
import { addNote } from '../services/apiActions/apiActions';
import { getAllNotes, getNote } from '../services/apiServices/noteApi';
import { longDateFormater } from '../utils/helper';

const AddNote = ({ route, navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useState('');

  const noteId: string = route.params.noteId;
  const selectedDate: string = route.params.selectedDate;

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    console.log('noteId', noteId);
    try {
      const response = await getNote(noteId);
      setPage(response?.page || '');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = async () => {
    try {
      const body = {
        userId: user?._id,
        page,
        selectedDate,
      };
      const response = await addNote(body);
      if(response?.acknowledged){
          navigation.goBack();
      } else {
        Alert.alert('Notes updation failed', 'Please try again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Add Note</HeaderText>
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
          {longDateFormater(selectedDate)}
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
          width: '20%'
        }}
        onPress={handleAddNote}>
        save
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
