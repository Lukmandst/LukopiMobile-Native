import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/customHeader/header';
import HeaderDrawer from '../../components/customHeader/headerDrawer';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {GetSales} from '../../modules/api';
const screenWidth = Dimensions.get('window').width;
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
} from 'victory-native';

const DashboardPage = ({navigation}) => {
  const {sales} = GetSales();
  console.log(JSON.stringify(sales));

  const money = sales?.map(value => Number(value.income));
  const date = sales?.map(value => new Date(value.date).toString('id-ID'));
  console.log(money);
  const data = {
    labels: sales?.map(value =>
      new Date(value.date).toUTCString().split(',', 1),
    ),
    datasets: [
      {
        data: money ? money : [],
      },
    ],
  };
  const data2 = sales ? sales : [];

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 186, 51, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 186, 51, ${opacity})`,
  };

  return (
    <ScrollView ho style={styles.container}>
      <HeaderDrawer navigation={navigation} />
      <Text
        style={{
          fontFamily: 'Poppins-Black',
          color: '#000',
          fontSize: 35,
          textAlign: 'center',
        }}>
        Sales Chart
      </Text>
      <View style={styles.reportWrapper}>
        <Text
          style={{
            fontFamily: 'Poppins-Black',
            color: '#000',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Daily Report
        </Text>
        <ScrollView horizontal={true} style={styles.chartContainer}>
          <BarChart
            // style={graphStyle}
            data={data}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
          />
        </ScrollView>
      </View>

      <Image
        source={require('../../assets/images/Size-03.png')}
        resizeMode="cover"
        style={{width: 350, height: 350}}
      />
      <View
        style={{
          marginTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          // marginBottom: 15,
        }}>
        <TouchableOpacity
          // onPress={updateHandler}
          style={{
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
            padding: 10,
            borderRadius: 10,
            height: 40,
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              color: '#fff',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryGroup>
            <VictoryBar data={data2} x="date" y="income" />
          </VictoryGroup>
        </VictoryChart>
      </View> */}
    </ScrollView>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
    paddingHorizontal: 30,
    paddingBottom: 25,
    // justifyContent: 'space-between',
    marginBottom: 25,
  },
  reportWrapper: {
    paddingVertical: 20,
    // height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
});
