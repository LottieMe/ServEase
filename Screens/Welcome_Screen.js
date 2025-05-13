import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { Manuale_400Regular } from '@expo-google-fonts/manuale';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome_Screen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
        'Manuale': Manuale_400Regular,
      });

      useEffect(() => {
              if (fontsLoaded) {
                  
                  const timer = setTimeout(() => {
                      navigation.navigate('Home');
                  }, 2000);
                  
                  return () => clearTimeout(timer);
              }
          }, [fontsLoaded, navigation]);

      if (!fontsLoaded) {
        return null;
      }

  return (
    <LinearGradient
  colors={['#034D9D', '#011837']}
  style={styles.gradient}>

    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.txtWelcome}>Welcome to</Text> 
      <Text style={styles.title}>ServEase</Text>
    </View>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
       
    },
    main:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    title: {
        fontSize: 85,
        color: 'white',
        fontFamily: 'MarckScript',   
    },
    txtWelcome: {
        fontSize: 45,
        color: 'white',
        fontFamily: 'Manuale',   
       paddingBottom: 20,
    },

    

})



export default Welcome_Screen;