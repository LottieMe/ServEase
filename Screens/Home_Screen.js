import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { Lora_400Regular } from '@expo-google-fonts/lora';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import React, { useState } from 'react';


const Home_Screen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
        'Lora' : Lora_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider> 
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.gradientWrapper}>
                    <LinearGradient 
                        colors={['#0C57A9',  '#FFFFFF']} 
                        style={styles.gradientContainer}
                        start={{ x: 1, y: 0 }}
                         end={{ x: 0, y: 1 }}

                    >
                        <View style={styles.section1}>
                            <Text style={styles.title}>ServEase</Text>
                            <View style={styles.topContent}>
                                <Text style={styles.topContentText}>Category</Text>
                                <Text style={styles.topContentText} onPress={() => navigation.navigate('BookedServices')}>Booked Services</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                                <Text style={styles.topContentText}>Account</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchContainer}>
                                <MaterialCommunityIcons name="magnify" size={24} color="white" />
                                <TextInput 
                                    style={styles.searchBar} 
                                    placeholder='Search'
                                    placeholderTextColor="white"
                                />
                                <MaterialCommunityIcons name="microphone" size={24} color="white" />
                            </View>
                            <View style={styles.bottomPart}>
                                {/* Home Address is now clickable */}
                                <TouchableOpacity onPress={() => navigation.navigate('Account_Screen')}>
                                    <Text style={styles.bottomPartText}>Home Address</Text>
                                </TouchableOpacity>

                                <View style={styles.favoriteContainer}>
                                    <Text style={styles.bottomPartText}>Favorites</Text>
                                    <MaterialCommunityIcons 
                                        style={styles.favIcon} 
                                        name='star-circle-outline' 
                                        size={20}
                                    />
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.section2}>
                    <Text style={styles.section2Title}>Popular Categories</Text>
                    <View style={styles.serviceContainer}>
                        <View style={styles.topServices}>
                            <TouchableOpacity style={styles.services} onPress={() => navigation.navigate('HomeServices')}>
                                <Image style={styles.serviceIcon} source={require('../assets/Home_Icon.png')}/>
                                <Text style={styles.serviceText}>Home Services</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.services}>
                                <Image style={styles.serviceIcon} source={require('../assets/TechSupport_Icon.png')}/>
                                <Text style={styles.serviceText}>Tech Support</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomServices}>
                        <TouchableOpacity style={styles.services}>
                                <Image style={styles.serviceIcon} source={require('../assets/Health_Icon.png')}/>
                                <Text style={styles.serviceText}>Health & Wellness</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.services}>
                                <Image style={styles.serviceIcon} source={require('../assets/Education_Icon.png')}/>
                                <Text style={styles.serviceText}>Education</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        
        flex: 1,
    },
    gradientWrapper: {
        height: 350,
    },
    gradientContainer: {
        flex: 1,
    },
    section1: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 48,
        color: 'white',
        fontFamily: 'MarckScript',  
        textAlign: 'center',
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    topContentText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lora'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#034D9D',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        width: '100%',
    },
    searchBar: {
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        
    },
    bottomPart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom:20,
        width: '100%',
      },
      bottomPartText: {
        color: 'white',
        backgroundColor: '#0A84FF',
        padding: 10,
        borderRadius: 20,
        marginRight: 5,
        fontWeight: 'bold'
      },
      favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A84FF',
        borderRadius: 20,
        paddingRight: 10, 
      },
      favIcon: {
        color: '#FBBC05',
      },
    section2: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgb(0, 108, 167)',
    },
    section2Title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'white'
    },
    serviceContainer: {
        width: '100%',
    },
    topServices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bottomServices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    services: {
        alignItems: 'center',
        backgroundColor: '#B4CDE9',
        paddingVertical: 10,
        width: '45%',
        borderRadius: 10
    },
    serviceIcon: {
        resizeMode: 'contain',
        width: 66,
        height: 66,
        marginBottom: 8,
    },
    serviceText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#034D9D',
        fontWeight: 'bold'
    },
});

export default Home_Screen;