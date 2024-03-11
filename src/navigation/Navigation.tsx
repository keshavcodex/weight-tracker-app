import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeModal from '../theme/theme';
import WeightHistory from '../screens/WeightHistory';
import AddWeight from '../screens/AddWeight';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const isAuthenticated = useSelector((state: any) => state.user.userInfo);
  const theme = themeModal();

  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddWeight"
          component={AddWeight}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeightHistory"
          component={WeightHistory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function AccountStack() {
    return (
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen
          name="AccountPage"
          component={Account}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.primary}
      />
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = '';
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={'#000'} />;
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: theme.primary,
            tabBarInactiveBackgroundColor: theme.primary,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle: { fontSize: 15 },
          })}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountStack}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Navigation;
