import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

// Screens
import Title_Screen from './Screens/Title_Screen';
import Opening_Screen from './Screens/Opening_Screen';
import Welcome_Screen from './Screens/Welcome_Screen';
import Authentication_Screen from './Screens/Authentication_Screen';
import Signin_Screen from './Screens/Signin_Screen';
import Signup_Screen from './Screens/Signup_Screen';
import Home_Screen from './Screens/Home_Screen';
import Account_Screen from './Screens/Account_Screen';
import HomeServices_Screen from './Screens/HomeServices_Screen';
import HomeCleaning_Screen from './Screens/HomeCleaning_Screen';
import PlumbingServices_Screen from './Screens/PlumbingServices_Screen';
import EducationSupport_Screen from './Screens/EducationSupport_Screen';
import Location_Screen from './Screens/Location_Screen';
import Rate_Screen from './Screens/Rate_Screen';
import HomeServiceBooking from './Screens/HomeServiceBooking';
import BookedServices from './Screens/Booked_Services';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen name="Title" component={Title_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Opening" component={Opening_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Authentication" component={Authentication_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={Account_Screen} options={customHeaderOptions} />
        <Stack.Screen name="BookedServices" component={BookedServices} options={customHeaderOptions} />
        <Stack.Screen name="HomeServices" component={HomeServices_Screen} options={customHeaderOptions} />
        <Stack.Screen name="HomeCleaning" component={HomeCleaning_Screen} options={customHeaderOptions} />
        <Stack.Screen name="PlumbingServices" component={PlumbingServices_Screen} options={customHeaderOptions} />
        <Stack.Screen name="EducationSupport" component={EducationSupport_Screen} options={customHeaderOptions} />
        <Stack.Screen name="Location" component={Location_Screen} options={customHeaderOptions} />
        <Stack.Screen name="Rate" component={Rate_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeServiceBooking" component={HomeServiceBooking} options={customHeaderOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const customHeaderOptions = {
  header: ({ navigation }) => (
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  ),
  headerTransparent: true,
};

const styles = StyleSheet.create({
  customHeader: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  backButton: {
    marginLeft: 15,
    padding: 10,
  },
});
