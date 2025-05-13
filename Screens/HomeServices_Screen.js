import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { Montaga_400Regular } from '@expo-google-fonts/montaga';

const HomeServices_Screen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
        'Montaga' : Montaga_400Regular,
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
   
    <SafeAreaProvider> 
        <SafeAreaView style={styles.container}>
    <View style={styles.main}>
      <Text style={styles.title}>CATEGORIES</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}showsVerticalScrollIndicator={false}>

      <View style={styles.service}>
        <Image style={styles.img} source={require('../assets/Cleaning.png')} />
        <Text style={styles.txtTitle}>Home Cleaning</Text>
        <Text style={styles.txtDescription}>Professional cleaning services for homes and offices.</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.txtPrice}>From ₱59/hr</Text>
          <TouchableOpacity style={styles.conBooking} onPress={() => navigation.navigate('HomeCleaning')}>
          <Text style={styles.txtBooking}>Book Now <MaterialCommunityIcons style={styles.arrowIcon} name='arrow-right'/></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.service}>
        <Image style={styles.img} source={require('../assets/Plumbing.png')} />
        <Text style={styles.txtTitle}>Plumbing Services</Text>
        <Text style={styles.txtDescription}>Expert plumbing repair and installation services.</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.txtPrice}>From ₱79/hr</Text>
          <TouchableOpacity style={styles.conBooking} onPress={() => navigation.navigate('PlumbingServices')}>
          <Text style={styles.txtBooking}>Book Now <MaterialCommunityIcons style={styles.arrowIcon} name='arrow-right'/></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.service}>
        <Image style={styles.img} source={require('../assets/Education.png')} />
        <Text style={styles.txtTitle}>Education Support</Text>
        <Text style={styles.txtDescription}>Expert tutoring services for academic success.</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.txtPrice}>From ₱79/hr</Text>
          <TouchableOpacity style={styles.conBooking} onPress={() => navigation.navigate('EducationSupport')}>
          <Text style={styles.txtBooking}>Book Now <MaterialCommunityIcons style={styles.arrowIcon} name='arrow-right'/></Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

    container: {
      backgroundColor: 'rgb(255, 255, 255)',
        flex: 1,
        alignItems: 'center',
    },
    main:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgb(0, 108, 167)',
      width: '100%',
      position: 'relative',
      paddingTop: 60,

    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 30,
    },
    title: {
        fontSize: 36,
        color: 'white',
        fontFamily: 'Montaga',  
        paddingBottom: 20, 
    },
    service:{
      backgroundColor:'rgb(15, 72, 130)',
      padding: 15,
      width: '90%',
      marginBottom: 20,

    },
    img:{
      resizeMode: 'contain',
      width: '100%',
    },
    txtTitle:{
      fontSize: 21,
      fontWeight:'bold'
    },
    txtDescription:{
      fontSize: 12,
      marginBottom: 10,
    },
    bottomContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    txtPrice:{
      fontSize: 12,
      color:'white'
    },
    txtBooking:{
      fontSize: 12,
      color:'white',
    },

})



export default HomeServices_Screen;