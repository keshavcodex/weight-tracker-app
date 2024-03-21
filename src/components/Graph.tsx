import { LineChart } from 'react-native-chart-kit';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import themeModal from '../theme/theme';

const Graph = ({ lables, data }: { lables: string[]; data: number[] }) => {
  const theme = themeModal();

  return (
    <View style={{ flex: 1, alignSelf: 'center' }}>
      <LineChart
        data={{
          labels: lables,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 10} // from react-native
        height={220}
        yAxisSuffix=" Kg"
        yAxisInterval={100}
        chartConfig={{
          backgroundColor: theme.white,
          backgroundGradientFrom: '#11121f',
          backgroundGradientTo: '#330909',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => theme.white,
          labelColor: (opacity = 1) => theme.white,
          style: {
            borderRadius: 1,
          },
          propsForDots: {
            fill: theme.white,
            strokeWidth: '2',
            stroke: theme.orange,
          },
        }}
        // bezier
        style={{
          borderRadius: 8,
          padding: 2,
          backgroundColor: theme.primary,
        }}
      />
    </View>
  );
};

export default Graph;
