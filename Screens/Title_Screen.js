import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { LinearGradient } from 'expo-linear-gradient';

const Title_Screen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded) {
            
            const timer = setTimeout(() => {
                navigation.navigate('Opening');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [fontsLoaded, navigation]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <LinearGradient
            colors={['#034D9D', '#011837']}
            style={styles.container}
        >
            <SafeAreaProvider> 
                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>ServEase</Text>
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
    title: {
        fontSize: 80,
        color: 'white',
        fontFamily: 'MarckScript',   
    },
})

export default Title_Screen;