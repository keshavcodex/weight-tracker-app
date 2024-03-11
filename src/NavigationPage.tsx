import {View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {getAllWeight} from './services/apiServices/weightApi';
import Navigation from './navigation/Navigation';

const NavigationPage = () => {
  const [allWeight, setAllWeight] = useState<any>([]);

  // useEffect(() => {
  //   fetchAllWeight();
  // }, []);

  // const fetchAllWeight = async () => {
  //   try {
  //     const response = await getAllWeight();
  //     console.log(response);
  //     setAllWeight(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <View style={{flex: 1, backgroundColor: '#30D5C850'}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>Home</Text>
      <View>
        {allWeight.map((data: any, index: number) => {
          return (
            <View key={index}>
              <Text style={{fontSize: 18}}>Name: {data?.userId}</Text>
              <Text style={{fontSize: 18}}>weight {data?.weight}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default NavigationPage;
