import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account_Screen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'MarckScript': MarckScript_400Regular,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No token found');

        const res = await fetch('https://salmon-gnu-597967.hostingersite.com/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          const error = await res.json();
          console.error('Error:', error);
          throw new Error(error.message || 'Failed to fetch profile.');
        }

        const data = await res.json();
        setProfile(data); // Optionally update UI with this data
      } catch (err) {
        console.error('Profile fetch error:', err.message);
        Alert.alert('Error', 'Failed to fetch profile data.');
      }
    };

    fetchProfile();
  }, []);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleLogout = async () => {
    hideModal();
    await AsyncStorage.removeItem('access_token');
    navigation.navigate('Signin');
  };

  if (!fontsLoaded) return null;

  return (
    <LinearGradient colors={['#034D9D', '#011837']} style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.main}>
              {/* Profile Section */}
              <View style={styles.section1}>
                <Image source={require('../assets/PP10.png')} style={styles.profileImage} />
                <MaterialCommunityIcons style={styles.pencilIcon} name='pencil' size={20} color='white' />
                <Text style={styles.txtName}>
                  {profile?.username || 'No username available'}
                </Text>
              </View>

              {/* Recovery Section */}
              <View style={styles.section2}>
                <Text style={styles.recoveryText}>Let's make sure you never lose access to your account.</Text>
                <Text style={styles.txtRecover}>Set up recovery email</Text>
              </View>

              {/* Account Section */}
              <View style={styles.section3}>
                <Text style={styles.txtTitle}>My account</Text>
                <Text style={styles.sectionText}>Payment Methods</Text>
                <View style={styles.line}></View>
                <Text style={styles.sectionText}>Save Places</Text>
                <View style={styles.line}></View>
                <Text style={styles.sectionText}>Emergency Contacts</Text>
                <View style={styles.line}></View>
              </View>

              {/* General Section */}
              <View style={styles.section3}>
                <Text style={styles.txtTitle}>General</Text>
                <Text style={styles.sectionText}>Help Center</Text>
                <View style={styles.line}></View>
                <Text style={styles.sectionText}>Settings</Text>
                <View style={styles.line}></View>
              </View>

              {/* Log Out Button */}
              <TouchableOpacity style={styles.btnLogout} onPress={showModal}>
                <Text style={styles.txtTitle}>Log Out</Text>
              </TouchableOpacity>

              {/* Log Out Confirmation Modal */}
              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={hideModal}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Are you sure?</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.noButton]}
                        onPress={hideModal}
                      >
                        <Text style={styles.modalButtonText}>No</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.yesButton]}
                        onPress={handleLogout}
                      >
                        <Text style={styles.modalButtonText}>Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#034D9D',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  section1: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  pencilIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  txtName: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'MarckScript',
  },
  section2: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recoveryText: {
    color: 'white',
    fontSize: 16,
  },
  txtRecover: {
    color: 'lightblue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  section3: {
    width: '100%',
    marginBottom: 20,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 5,
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginVertical: 5,
  },
  btnLogout: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  noButton: {
    backgroundColor: '#BDC3C7',
  },
  yesButton: {
    backgroundColor: '#E74C3C',
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Account_Screen;
