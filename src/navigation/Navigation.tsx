import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const user = useSelector((state: any) => state.user);
  console.log('user for auth', user);
  const isAuthenticated = user?.email;

  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function AccountStack() {
    return (
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Account"
            component={AccountStack}
            options={{ headerShown: false }}
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
