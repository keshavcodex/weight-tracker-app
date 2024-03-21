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
import Accordian from '../components/Accordian';

const Home = ({ navigation }: any) => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user.userInfo);

  const [userWeight, setUserWeight] = useState(0);
  const [allWeight, setAllWeight] = useState<any>([]);
  const [graphData, setGraphData] = useState<number[]>([0]);
  const [graphLables, setGraphLables] = useState<string[]>(['']);
  const [refreshing, setRefreshing] = useState(false);
  const items = ['1 week', '1 month', '3 months', '1 year', '2 years'];
  const [graphDurations, setGraphDurations] = useState(items);
  const [selectedGraph, setSelectedGraph] = useState(
    graphDurations[graphDurations.length - 1],
  );

  useEffect(() => {
    fetchWeight();
  }, []);

  const fetchWeight = async () => {
    try {
      setRefreshing(true);
      const response = await getAllWeight(user?._id);
      setUserWeight(response[0]?.weight || 0);
      trimItems(response?.length);
      loadGraph(response);
      setAllWeight(response);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadGraph(allWeight);
  }, [selectedGraph]);

  const loadGraph = (response: any) => {
    switch (selectedGraph) {
      case items[0]:
        oneWeekGraph(response);
        break;
      case items[1]:
        oneMonthGraph(response);
        break;
      case items[2]:
        threeMonthGraph(response);
        break;
      case items[3]:
        oneYearGraph(response);
        break;
      case items[4]:
        twoYearGraph(response);
        break;
    }
  };
  const oneWeekGraph = (response: any) => {
    const weightList = [];
    const labelsList = [];
    const n = Math.min(7, response.length);
    for (let i = 0; i < n; i++) {
      weightList.push(response[i]?.weight);
      labelsList.push(1 + i + 'd');
    }
    weightList.reverse();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const oneMonthGraph = (response: any) => {
    const n = Math.min(32, response.length);
    if (n < 8) {
      oneWeekGraph(response);
      return;
    }
    const weightList = [];
    const labelsList = [];
    for (let i = 0; i < n; i++) {
      if (i == 0) labelsList.push(1 + 'd');
      else if (i % 5 == 0) labelsList.push(i + 'd');
      weightList.push(response[i]?.weight);
    }

    weightList.reverse();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const twoMonthGraph = (response: any) => {
    const n = Math.min(62, response.length);
    if (n <= 32) {
      oneMonthGraph(response);
      return;
    }
    const weightList = [];
    const labelsList = [];
    for (let i = 0; i < n; i++) {
      if (i == 0) {
        labelsList.push(1 + 'd');
        weightList.push(response[i]?.weight);
        continue;
      } else if (i % 10 == 0) labelsList.push(i + 'd');
      if (i % 5 == 0) {
        weightList.push(response[i]?.weight);
      }
    }

    weightList.reverse();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const threeMonthGraph = (response: any) => {
    const n = Math.min(92, response.length);
    if (n <= 62) {
      twoMonthGraph(response);
      return;
    }
    const weightList = [];
    const labelsList = [];
    for (let i = 0; i < n; i++) {
      if (i == 0) {
        labelsList.push(1 + 'd');
        weightList.push(response[i]?.weight);
        continue;
      } else if (i % 10 == 0) labelsList.push(i + 'd');
      if (i % 5 == 0) {
        weightList.push(response[i]?.weight);
      }
    }

    weightList.reverse();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const oneYearGraph = (response: any) => {
    const n = Math.min(365, response.length);
    if (n <= 92) {
      threeMonthGraph(response);
      return;
    }
    const weightList = [];
    const labelsList = [];
    for (let i = 0; i < n; i++) {
      if (i % 60 == 0) labelsList.push(i / 30 + 'm');
      if (i % 20 == 0) {
        weightList.push(response[i]?.weight);
      }
    }

    weightList.reverse();
    weightList.sort();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const twoYearGraph = (response: any) => {
    const n = Math.min(750, response.length);
    if (n <= 370) {
      oneYearGraph(response);
      return;
    }
    const weightList = [];
    const labelsList = [];
    for (let i = 0; i < n; i++) {
      if (i % 90 == 0) labelsList.push(i / 30 + 'm');
      if (i % 45 == 0) {
        weightList.push(response[i]?.weight);
      }
    }

    weightList.reverse();
    weightList.sort();
    setGraphData(weightList);
    setGraphLables(labelsList);
  };
  const trimItems = (length: number) => {
    // trim the items when we don't want to show all graph durations
    var tempItems = [...items]
    if (length < 365) {
      tempItems.splice(3);
    } else if (length < 730) {
      tempItems.splice(4);
    }
    setGraphDurations(tempItems);
    setSelectedGraph(graphDurations[tempItems.length - 1]);
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
              color: theme.orangisGrey,
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
        <Accordian
          title={'Graph duration (' + selectedGraph + ')'}
          items={graphDurations}
          selectedGraph={selectedGraph}
          setSelectedGraph={setSelectedGraph}
        />
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
