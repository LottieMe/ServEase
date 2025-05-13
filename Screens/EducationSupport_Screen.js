import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { Montaga_400Regular } from '@expo-google-fonts/montaga';

const EducationSupport_Screen = ({ navigation }) => {

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
        <View style={styles.navBar}>
            <Text style={styles.txtNav}>Category</Text>
            <Text style={styles.txtNav}>Booked Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Text style={styles.txtNav}>Account</Text>
            </TouchableOpacity>
        </View>
      <Text style={styles.title}>EDUCATION SUPPORT</Text>

      <View style={styles.service}>
        <View style={styles.overlap}>
            <Text style={styles.txtAvailable}>Available</Text>
            <Text>
            <MaterialCommunityIcons style={styles.starIcon} name="star" />
            4.9(99)
            </Text>
        </View>

  <TouchableOpacity
    style={styles.touchableArea}
    onPress={() => {
      const serviceData = {
        id: 4,
        userid: 4,
        category: 'Tutoring',
        name: 'Denice Sean',
        description: 'Expert tutoring services and academic needs.',
      };
      navigation.navigate('HomeServiceBooking', { service: serviceData });
    }}
  >
    <View style={styles.conInfo}>
      <Image style={styles.img} source={require('../assets/PP7.png')} />
      <View style={styles.serviceInfo}>
        <Text style={styles.txtName}>Denice Sean</Text>
        <Text style={styles.txtDescription}>Expert tutoring services and academic needs.</Text>
        <View style={styles.serviceOptions}>
          <Text style={styles.txtService}>Tutoring</Text>
          <Text style={styles.txtService}>Academic Works</Text>
        </View>
      </View>
    </View>

    <View style={styles.bottomContent}>
      <Text style={styles.bottomText}>₱80/hr</Text>
      <Text style={styles.bottomText}>
        View Profile <MaterialCommunityIcons style={styles.arrowIcon} name="arrow-right" />
      </Text>
    </View>
  </TouchableOpacity>
</View>


<View style={styles.service}>
  <View style={styles.overlap}>
    <Text style={styles.txtAvailable}>Available</Text>
    <Text>
      <MaterialCommunityIcons style={styles.starIcon} name="star" />
      4.8(68)
    </Text>
  </View>

  <TouchableOpacity
    style={styles.touchableArea}
    onPress={() => {
      const serviceData = {
        id: 5,
        userid: 5,
        category: 'Tutoring',
        name: 'Harison Dan',
        description: 'Expert tutoring services and academic needs.',
      };
      navigation.navigate('HomeServiceBooking', { service: serviceData });
    }}
  >
    <View style={styles.conInfo}>
      <Image style={styles.img} source={require('../assets/PP8.png')} />
      <View style={styles.serviceInfo}>
        <Text style={styles.txtName}>Harison Dan</Text>
        <Text style={styles.txtDescription}>Expert tutoring services and academic needs.</Text>
        <View style={styles.serviceOptions}>
          <Text style={styles.txtService}>Tutoring</Text>
          <Text style={styles.txtService}>Academic Works</Text>
        </View>
      </View>
    </View>

    <View style={styles.bottomContent}>
      <Text style={styles.bottomText}>₱79/hr</Text>
      <Text style={styles.bottomText}>
        View Profile <MaterialCommunityIcons style={styles.arrowIcon} name="arrow-right" />
      </Text>
    </View>
  </TouchableOpacity>
</View>


<View style={styles.service}>
  <View style={styles.overlap}>
    <Text style={styles.txtAvailable}>Available</Text>
    <Text>
      <MaterialCommunityIcons style={styles.starIcon} name="star" />
      4.9(129)
    </Text>
  </View>

  <TouchableOpacity
    style={styles.touchableArea}
    onPress={() => {
      const serviceData = {
        id: 6,
        userid: 6,
        category: 'Tutoring',
        name: 'Kyle Oak',
        description: 'Expert tutoring services and academic needs.',
      };
      navigation.navigate('HomeServiceBooking', { service: serviceData });
    }}
  >
    <View style={styles.conInfo}>
      <Image style={styles.img} source={require('../assets/PP9.png')} />
      <View style={styles.serviceInfo}>
        <Text style={styles.txtName}>Kyle Oak</Text>
        <Text style={styles.txtDescription}>Expert tutoring services and academic needs.</Text>
        <View style={styles.serviceOptions}>
          <Text style={styles.txtService}>Tutoring</Text>
          <Text style={styles.txtService}>Academic Works</Text>
        </View>
      </View>
    </View>

    <View style={styles.bottomContent}>
      <Text style={styles.bottomText}>₱98/hr</Text>
      <Text style={styles.bottomText}>
        View Profile <MaterialCommunityIcons style={styles.arrowIcon} name="arrow-right" />
      </Text>
    </View>
  </TouchableOpacity>
</View>


      

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
      paddingTop: 60,

    },
    navBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingVertical: 10,
    },
    txtNav:{
        color: 'white',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Montaga',  
        paddingVertical: 30, 
    },
    service:{
      backgroundColor:'rgb(255, 255, 255)',
      padding: 10,
      width: '90%',
      marginBottom: 20,
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    
    overlap:{
        alignSelf: 'flex-end',
        position: 'absolute',
        top: -15,
        right: 10,
    },
    txtAvailable:{
        backgroundColor: '#34A853',
        //padding: 10,
        textAlign: 'center',
        paddingVertical: 5,
        height:25,
        width: 62,
        borderRadius: 20,
        color: 'white',
        fontSize: 10,
    },
    starIcon:{
        color: 'rgb(255, 215, 0)',
        fontSize: 15,
    },
    serviceInfo:{
        width: '65%',
        flexDirection: 'column',
    },
    img:{
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    conInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    txtName:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    txtDescription:{
        fontSize: 10,
        marginBottom: 10,
    },
    serviceOptions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        
    },
    txtService:{
        backgroundColor: '#60A2E9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 5,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 10,
    },
    bottomContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    bottomText:{
        fontSize: 12,
        color:'#034D9D',
        fontWeight: 'bold',
    },
  
})



export default EducationSupport_Screen;