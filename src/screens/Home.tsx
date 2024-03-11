import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { getAllWeight, getWeight } from '../services/apiServices/weightApi';
import themeModal from '../theme/theme';
import { useSelector } from 'react-redux';
import GradientText from '../components/GradientText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainButton from '../components/MainButton';
import SmallButton from '../components/SmallButton';
import Graph from '../components/Graph';

const Home = ({ navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);

  const [userWeight, setUserWeight] = useState(0);
  const [allWeight, setAllWeight] = useState<any>([]);
  const [graphData, setGraphData] = useState<number[]>([0]);
  const [graphLables, setGraphLables] = useState<string[]>(['']);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWeight();
  }, []);

  const fetchWeight = async () => {
    try {
      setRefreshing(true);
      const response = await getAllWeight(user?._id);
      setUserWeight(response[0]?.weight || 0);
      setAllWeight(response);

      const weightList = [];
      const labelsList = [];
      const n = 30;
      for (let i = 0; i < n; i++) {
        if (i >= response.length) {
          labelsList.push('');
          break;
        }
        weightList.push(response[i]?.weight);
        if (i == 0) labelsList.push(1 + ' day');
        else if (i % 5 == 0) labelsList.push('    ' + i + ' days');
        else labelsList.push('');
      }
      weightList.reverse();
      setGraphData(weightList);
      setGraphLables(labelsList);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };
  const onRefresh = useCallback(async () => {
    fetchWeight();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          <GradientText
            style={{
              fontSize: 30,
              fontWeight: '600',
              textAlign: 'center',
            }}
            gradientHeight={30}
            colors={[
              theme.dark ? theme.white : theme.blue,
              theme.dark ? theme.yellow : 'red',
            ]}>
            Weight Tracker
          </GradientText>
          <Text
            style={{
              color: theme.fullColorInverse,
              fontSize: 30,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Hello, {user?.firstName} your current weight is {userWeight} kg.
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          {graphData[0] > 0 && <Graph lables={graphLables} data={graphData} />}
        </View>
        <MainButton
          customStyle={{
            margin: 10,
            borderWidth: 0.5,
          }}
          onPress={() => navigation.navigate('WeightHistory')}>
          Weight History
        </MainButton>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            padding: 10,
          }}>
          <View>
            <SmallButton
              onPress={() => navigation.navigate('AddWeight')}
              customStyle={{
                alignSelf: 'flex-end',
                borderWidth: 0.5,
              }}>
              Add Weight
            </SmallButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
