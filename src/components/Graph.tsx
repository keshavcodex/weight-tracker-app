import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
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
          backgroundColor: theme.primary,
        //   backgroundGradientFrom: theme.main,
          backgroundGradientTo: '#01424f',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 255, 255, ${0.5})`,
          labelColor: (opacity = 1) => `rgba(0, 255, 255, ${1})`,
          style: {
            borderRadius: 2,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '5',
            stroke: theme.primary,
          },
        }}
        bezier
        style={{
          borderRadius: 8,
          padding: 4,
          backgroundColor: theme.primary,
        }}
      />
    </View>
  );
};

export default Graph;
