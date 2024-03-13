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
import { longDateFormater, trimDate } from '../utils/helper';
import { RefreshControl } from 'react-native';

const NoteList = ({ navigation }: any) => {
  const theme = themeModal();
  const today = new Date();
  const user = useSelector((state: any) => state.user.userInfo);
  const [items, setItems] = useState();
  const dateString =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [selectedDate, setSelectedDate] = useState(dateString);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await getAllNotes(user?._id);
      const itemList = response.reduce((accumulation: any, note: any) => {
        const formattedDate = trimDate(note.selectedDate);

        if (accumulation[formattedDate]) {
          accumulation[formattedDate].push(note);
        } else {
          accumulation[formattedDate] = [note];
        }

        return accumulation;
      }, {});
      setItems(itemList);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAllNotes(); // Call your existing function to fetch notes
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEditNote = async (item: any) => {
    try {
      const date = trimDate(item.selectedDate);
      navigation.navigate('EditNote', { noteId: item._id, selectedDate: date });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Notes List</HeaderText>
      <Agenda
        selected={selectedDate}
        pastScrollRange={12}
        futureScrollRange={12}
        // markToday={}
        // scrollToNextEvent={false}
        items={items}
        showClosingKnob
        renderEmptyDate={() => {
          return (
            <Text
              style={{
                fontSize: 20,
                color: theme.black,
                textAlign: 'center',
              }}>
              M
            </Text>
          );
        }}
        renderEmptyData={() => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.black,
                  textAlign: 'center',
                }}>
                No note avilable
                {/* {'\n' + longDateFormater(selectedDate)} */}
              </Text>
            </View>
          );
        }}
        renderItem={(item: any, isFirst) => (
          <Pressable style={styles.item} onPress={() => handleEditNote(item)}>
            <Text style={styles.itemText}>{item.page}</Text>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        theme={{
          calendarBackground: theme.primary,
          selectedDayBackgroundColor: theme.orange,
          arrowColor: theme.orange,
          textSectionTitleColor: theme.black,
          selectedDayTextColor: theme.seaGreen,
          monthTextColor: theme.fullColorInverse,
          todayTextColor: theme.black,
          dayTextColor: theme.white,
          textDisabledColor: theme.smoke,
        }}
      />
      <SmallButton
        customStyle={{
          marginVertical: 10,
          marginRight: 10,
          borderWidth: 0.5,
          borderRadius: 5,
          alignSelf: 'flex-end',
          width: 50,
        }}
        onPress={() => navigation.navigate('AddNote')}>
        +
      </SmallButton>
    </View>
  );
};

export default NoteList;

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
