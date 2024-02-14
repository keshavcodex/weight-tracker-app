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
  const [graphLables, setGraphLables] = useState<string[]>([]);

  useEffect(() => {
    fetchWeight();
  }, []);

  const fetchWeight = async () => {
    try {
      console.log(user?._id);
      const response = await getAllWeight(user?._id);
      setUserWeight(response[0]?.weight);
      setAllWeight(response);

      const weightList = [];
      const labelsList = [];

      for (let i = 0; i < 30; i++) {
        if (i >= response.length) {
          labelsList.push('');
          break;
        }
        weightList.push(response[i]?.weight);
        if (i == 0) labelsList.push(1 + 'd');
        else if (i % 5 == 0) labelsList.push('    ' + i + ' days');
        else labelsList.push('');
      }
      setGraphData(weightList);
      setGraphLables(labelsList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        <GradientText
          style={{
            fontSize: 30,
            fontWeight: '600',
            textAlign: 'center',
          }}
          gradientHeight={30}
          colors={[theme.dark ? theme.white : theme.blue, theme.dark ? theme.yellow : 'red']}>
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
        <Graph lables={graphLables} data={graphData} />
      </View>
      <MainButton
        customStyle={{
          marginHorizontal: 10,
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
    </View>
  );
};

export default Home;
