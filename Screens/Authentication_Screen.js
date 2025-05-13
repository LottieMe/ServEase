import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { LinearGradient } from 'expo-linear-gradient';

const Authentication_Screen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
      });

      if (!fontsLoaded) {
        return null;
      }

  return (
    <LinearGradient
  colors={['#034D9D', '#011837']}
  style={styles.container}>

    <SafeAreaView style={styles.container}>

    <Text style={styles.title}>ServEase</Text>
    <View>      
      <TouchableOpacity style={styles.btnSignin} onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.txtSignin}>Sign in</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.conNew}>
      <Text style={styles.txtNew}>New? </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.txtCreate}>Create</Text>
      </TouchableOpacity>
      
    </View>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 70,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'MarckScript',  
        marginBottom: 50, 
    },
    btnSignin: {
        backgroundColor: '#3373C4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 10,
        width: 232,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    txtSignin: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Poppins',
    },
    conNew: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 232,  
    },
     txtNew: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',
    },

    txtCreate: {
      fontSize: 13,
      fontWeight: 'bold',
      color: 'white',
      fontFamily: 'Poppins',
      alignSelf: 'flex-start',
  },

})



export default Authentication_Screen;