import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin_Screen = ({ navigation }) => {
    const API_BASE_URL = 'https://salmon-gnu-597967.hostingersite.com/api/';
    const netInfo = useNetInfo(); // Correct usage
    const [fontsLoaded] = useFonts({
        'MarckScript': MarckScript_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Optional: log connection info
    useEffect(() => {
        console.log("Connection type", netInfo.type);
        console.log("Is connected?", netInfo.isConnected);
    }, [netInfo]);

    // Function to handle login
    const login = async () => {
        if (!netInfo.isConnected) {
            Alert.alert('No Internet', 'Please check your internet connection and try again.');
            return;
        }

        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",  
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const { access_token } = data;
                await AsyncStorage.setItem('access_token', access_token);
                console.log('Token stored successfully');
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaProvider> 
            <LinearGradient colors={['#034D9D', '#011837']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.contentContainer}>

                        <Text style={styles.title}>Sign in</Text>
                        
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor='#011B37'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor='#011B37'
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <MaterialCommunityIcons 
                                    name={showPassword ? "eye-off" : "eye"} 
                                    size={24} 
                                    color="#011B37" 
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.txtForgot}>Forgot password?</Text>    
                        
                        <TouchableOpacity 
                            style={styles.btnSignin} 
                            onPress={login} 
                            disabled={isLoading}
                        >
                            <Text style={styles.btnText}>{isLoading ? 'Logging in...' : 'Log in'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.orText}>or continue with</Text>
                        
                        <View style={styles.continueContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                                <Image source={require('../assets/FB_Logo.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                                <Image source={require('../assets/Google_Logo.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'poppins',
        paddingBottom: 20,
        alignSelf: 'flex-start',
        width: '80%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#96C0ED',
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        width: '100%',
        height: 60,
        marginBottom: 15,
    },
    iconContainer: {
        position: 'absolute',
        top: 85,
        right: 15,
        padding: 10,
    },
    btnSignin: {
        backgroundColor: '#3373C4',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'poppins',
    },
    txtForgot: {
        color: 'white',
        alignSelf: 'flex-end',
        width: '35%',
        paddingBottom: 20,
    },
    orText: {
        color: 'white',
        marginVertical: 20,
    },
    continueContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
        margin: 15,
    },
});

export default Signin_Screen;
