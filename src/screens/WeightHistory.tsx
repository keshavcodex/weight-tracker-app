import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllWeight } from '../services/apiServices/weightApi';
import { useSelector } from 'react-redux';
import themeModal from '../theme/theme';
import { dateFormater } from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import HeaderText from '../components/HeaderText';
import { useNavigation } from '@react-navigation/native';
import Graph from '../components/Graph';
import { deleteWeight } from '../services/apiActions/apiActions';
import DeleteConfirmationModal from '../components/DeleteAlert';

const WeightHistory = () => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [allWeight, setAllWeight] = useState<any>([]);
  const [deleteModalVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWeight();
  }, []);

  const fetchWeight = async () => {
    try {
      setRefreshing(true);
      const response = await getAllWeight(user?._id);
      setAllWeight(response);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  const onRefresh = useCallback(async () => {
    fetchWeight();
  }, []);

  const confirmDeletion = async (id: string) => {
    setDeleteVisible(true);
    setDeleteId(id);
  };

  const deleteUserWeight = async () => {
    try {
      const response = await deleteWeight(deleteId);
      fetchWeight();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Weight History</HeaderText>
      {/* <Graph /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {allWeight?.map((weightData: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderWidth: 1,
                borderRadius: 8,
                marginVertical: 5,
                paddingVertical: 5,
                backgroundColor: theme.dark
                  ? theme.orangisGrey
                  : theme.fullColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="weight-lifter"
                  color={theme.fullColorInverse}
                  size={30}
                />
                <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                  {parseFloat(weightData?.weight).toFixed(1)} {'Kg'}
                </Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>
                  {dateFormater(weightData?.selectedDate)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* <Feather
                  name="edit"
                  color={theme.fullColorInverse}
                  size={23}
                  style={{ paddingHorizontal: 10 }}
                /> */}
                <Pressable onPress={() => confirmDeletion(weightData._id)}>
                  <Feather
                    name="trash-2"
                    color={theme.fullColorInverse}
                    size={23}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <DeleteConfirmationModal
        isVisible={deleteModalVisible}
        setIsVisible={setDeleteVisible}
        onDelete={deleteUserWeight}
        onClose={() => console.log('close')}
      />
    </View>
  );
};

export default WeightHistory;
