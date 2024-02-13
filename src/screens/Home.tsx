import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllWeight, getWeight } from '../services/apiServices/weightApi';
import themeModal from '../theme/theme';
import { useSelector } from 'react-redux';
import GradientText from '../components/GradientText';

const Home = () => {
  const theme = themeModal();
  const user = useSelector((state: any) => state.user);
  const [userWeight, setUserWeight] = useState(0);
  const [allWeight, setAllWeight] = useState<any>([]);

  useEffect(() => {
    fetchWeight();
    // fetchAllWeight();
  }, []);

  //   const fetchAllWeight = async () => {
  //     try {
  //       const response = await getAllWeight();
  //       console.log(response);
  //       setAllWeight(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const fetchWeight = async () => {
    try {
      const response = await getWeight(user?._id);
      setUserWeight(response?.userWeight?.weight);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.main }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
          }}>
          Weight Tracker
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <GradientText
          style={{
            fontSize: 30,
            fontWeight: '600',
            textAlign: 'center',
          }}
          gradientHeight={30}
          colors={['blue', 'red']}>
          Hello, {user?.firstName} your current weight is {userWeight} kg.
        </GradientText>
        {allWeight?.map((data: any, index: number) => {
          return (
            <View key={index}>
              <Text style={{ fontSize: 18 }}>Name: {data?.userId}</Text>
              <Text style={{ fontSize: 18 }}>weight {data?.weight}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Home;
