import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllWeight } from '../services/apiServices/weightApi';
import { useSelector } from 'react-redux';
import themeModal from '../theme/theme';
import { dateFormater } from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderText from '../components/HeaderText';
import { useNavigation } from '@react-navigation/native';
import Graph from '../components/Graph';

const WeightHistory = () => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);
  const [allWeight, setAllWeight] = useState<any>([]);

  useEffect(() => {
    fetchWeight();
  }, []);

  const fetchWeight = async () => {
    try {
      const response = await getAllWeight(user?._id);
      console.log(response[0]?.weight);
      setAllWeight(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <HeaderText left>Weight History</HeaderText>
      {/* <Graph /> */}
      <ScrollView style={{ borderWidth: 1, borderColor: theme.primary }}>
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
                backgroundColor: theme.fullColor,
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
                  {weightData?.weight} {'Kg'}
                </Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>
                  on {dateFormater(weightData?.lastUpdated)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeightHistory;
