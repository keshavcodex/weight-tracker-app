import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
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

const EditNote = ({ route, navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [page, setPage] = useState('');
  const [undoPage, setUndoPage] = useState('');

  const noteId: string = route.params.noteId;
  const selectedDate: string = route.params.selectedDate;

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
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
      if (response?.acknowledged) {
        navigation.goBack();
      } else {
        Alert.alert('Notes updation failed', 'Please try again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Edit Note</HeaderText>
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
            fontWeight: '500',
            color: theme.fullColorInverse,
          }}>
          {longDateFormater(selectedDate)}
        </Text>

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
          {page.length < 1 ? (
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
          ) : (
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

export default EditNote;

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
