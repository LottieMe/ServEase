import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { Montaga_400Regular } from '@expo-google-fonts/montaga';
import { LinearGradient } from 'expo-linear-gradient';

const Opening_Screen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
        'Montaga' : Montaga_400Regular,
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
    <LinearGradient
    colors={['#034D9D', '#011837']}
    style={styles.container}>
    <SafeAreaProvider> 
        <SafeAreaView>
    <View style={styles.main}>
        <View  style={styles.section1}>
      <Text style={styles.Text1}>Find Trusted Service</Text>
      <Text style={styles.Text2}>Providers Nearby</Text>
      <View style={styles.Text3Container}>
      <Text style={styles.Text3}>Connect with verified professionals for all your service and needs. From home maintenance to personal care, find the right service provider in minutes. </Text>
      </View>
      </View>
      <TouchableOpacity style={styles.toBrowse} onPress={() => navigation.navigate('Authentication')}>
        <Text style={styles.Text4}>Browse Services</Text></TouchableOpacity>
      <TouchableOpacity style={styles.toView} onPress={() => navigation.navigate('Authentication')}>
        <Text style={[styles.Text4, { color: '#0A325E' }]}>View Providers</Text></TouchableOpacity>
     </View>
    </SafeAreaView>
    </SafeAreaProvider>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop: 150,
        paddingHorizontal: 20,
      },
    section1: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50,
      },
      Text1: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Montaga',
        alignSelf: 'start',
      },
        Text2: {
            fontSize: 40,
            color: '#1484FF',
            fontFamily: 'Montaga',
            alignSelf: 'start',
        },
        Text3: {
            fontSize: 14,
            color: 'white',
            fontFamily: 'poppins',
            alignSelf: 'start',
            paddingVertical: 10,
        },
        Text3Container:{
            width: '94%',
            alignSelf: 'start',
            marginVertical: 10,
        },
        toBrowse:{
            backgroundColor: '#308DF3',
            width: '60%',
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 20,
            alignItems: 'center',
            marginBottom: 20,
        },
        toView:{
            backgroundColor: 'white',
            width: '60%',
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 20,
        },
        Text4:{
            fontSize: 21,
            color: 'white',
            fontFamily: 'poppins',
        },
    

})



export default Opening_Screen;