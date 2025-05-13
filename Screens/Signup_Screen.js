import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator, // Import ActivityIndicator for loading spinner
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // 👈 Add this

const Signup_Screen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'MarckScript': MarckScript_400Regular,
  });

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 For confirm password toggle
  const [loading, setLoading] = useState(false); // Add loading state

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch('https://salmon-gnu-597967.hostingersite.com/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || null,
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Registration error:', data);
        Alert.alert('Error', data.message || 'Registration failed');
        return;
      }

      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Signin') },
      ]);
    } catch (error) {
      console.error('Registration exception:', error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#034D9D', '#011837']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Sign up</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.txtLabel}>Name (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Full Name"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.txtLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.txtLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
              />

              <Text style={styles.txtLabel}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.txtLabel}>Confirm Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter Password"
                  secureTextEntry={!showConfirmPassword}
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btnSignin}
                onPress={handleRegister}
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" /> // Show loading spinner
                ) : (
                  <Text style={styles.txtCreate}>Create</Text> // Button text changes to "Creating Account..."
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
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
    alignSelf: 'center',
    width: '40%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  txtLabel: {
    color: 'white',
  },
  input: {
    backgroundColor: 'rgb(207, 206, 206)',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: 60,
    marginBottom: 10,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  btnSignin: {
    backgroundColor: '#3373C4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(235, 235, 235)',
    padding: 15,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  txtCreate: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'poppins',
    fontWeight: 'bold',
  },
});

export default Signup_Screen;
