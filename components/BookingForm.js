import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, Modal, TouchableOpacity, Platform, CheckBox, ScrollView  , ActivityIndicator,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BookingForm = ({ serviceid, name, category, userid, onSubmit }) => {
  const navigation = useNavigation();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [longitude, setlongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }
  
      let currentLocation = await Location.getCurrentPositionAsync({});
      setSelectedLocation(currentLocation.coords);
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setlatitude(latitude);
    setlongitude(longitude);
    setSelectedLocation({ latitude, longitude });
    setLocationModalVisible(false); // Close modal after selection
  };

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      const currentDate = selectedValue || selectedDate;
      setSelectedDate(currentDate);
    } else {
      const currentTime = selectedValue || selectedTime;
      setSelectedTime(currentTime);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    const missingFields = [];
    
    // Check each required field and push missing ones into the array
    if (!name) missingFields.push('Selected Cleaner');
    if (!selectedLocation) missingFields.push('Select Location');
    if (!category) missingFields.push('Category');
    if (!address) missingFields.push('Service Address');
    if (!contactNumber) missingFields.push('Contact Number');
    if (!email) missingFields.push('Email');
    if (!paymentMethod) missingFields.push('Payment Method');
    if (!selectedDate) missingFields.push('Date');
    if (!selectedTime) missingFields.push('Time');
    if (!termsAccepted) missingFields.push('Terms and Conditions');

    if (missingFields.length > 0) {
      const missingMessage = `Please fill in the following fields: \n- ${missingFields.join('\n- ')}`;
      Alert.alert('Missing Information', missingMessage);
      return;
    }

    const bookingData = {
      user_id: parseInt(userid),
      service_id: serviceid,
      date: formatDate(selectedDate),  
      time: formatTime(selectedTime),
      address,
      name,
      latitude,
      longitude,
      contactNumber,
      email,
      paymentMethod,
      status: 'pending',
    };
    const token = await AsyncStorage.getItem('access_token');
    try {
      setLoading(true);
      const response = await fetch('https://salmon-gnu-597967.hostingersite.com/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
      
      console.log(data);
      if (!response.ok) {
        console.error('Booking error:', data);
        Alert.alert('Error', data.message || 'Booking failed');
        return;
      }
  
      Alert.alert('Success', 'Booking created successfully');
      // Optionally reset form or navigate
      navigation.navigate('Home')
    } catch (error) {
      console.error('Booking exception:', error);
      Alert.alert('Error', 'Something went wrong while booking.');
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Assigned Person</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={name}
          editable={false}
          pointerEvents="none" // Disables interaction
        />
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={category}
          editable={false}
          pointerEvents="none" // Disables interaction
        />
      </View>

      <Text style={styles.label}>Notes / Instructions</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter any special instructions..."
        />
      </View>

      {/* Location Map */}
      <Text style={styles.label}>Select Location (Tap to Mark Location)</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: selectedLocation?.latitude || 37.78825,
          longitude: selectedLocation?.longitude || -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>

      {/* Service Address */}
      <Text style={styles.label}>Service Address</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address details"
        />
      </View>

      {/* Contact Number */}
      <Text style={styles.label}>Contact Number</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />
      </View>

      {/* Payment Method */}
      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.inputLike}
          value={paymentMethod}
          onChangeText={setPaymentMethod}
          placeholder="Enter payment method (e.g., Cash, Credit Card)"
        />
      </View>

      {/* Date and Time Pickers */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.inputLike}
        value={selectedDate ? formatDate(selectedDate) : ''}
        onFocus={() => showMode('date')}
        placeholder="Select Date"
      />

        {/* Time Field */}
        <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.inputLike}
        value={selectedTime ? formatTime(selectedTime) : ''}
        onFocus={() => showMode('time')}
        placeholder="Select Time"
      />


{show && (
        <DateTimePicker
          testID="datetimepicker"
          value={mode === 'date' ? selectedDate || new Date() : selectedTime || new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

   {/* Terms and Conditions */}
<View style={styles.termsContainer}>
  <TouchableOpacity 
    style={styles.termsButton}
    onPress={() => setTermsAccepted(!termsAccepted)}
  >
    <View style={styles.checkboxContainer}>
      <View 
        style={[
          styles.checkbox, 
          termsAccepted && styles.checkboxSelected
        ]}
      >
        {termsAccepted && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.termsText}>
        I accept the terms and conditions
      </Text>
    </View>
  </TouchableOpacity>
</View>

<View style={styles.submitButton}>
  <TouchableOpacity
    style={styles.button}
    onPress={handleSubmit}
    disabled={loading}
  >
    {loading ? (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Booking...</Text>
      </View>
    ) : (
      <Text style={styles.buttonText}>Book Now</Text>
    )}
  </TouchableOpacity>
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  submitButton: {
    width: '100%', 
    backgroundColor: '#4CAF50', // Green theme
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:30
  },
  button: {
    backgroundColor: '#4CAF50', // Button color
    borderRadius: 8, // Rounded corners
    paddingVertical: 7, // Make the button taller
    paddingHorizontal: 10, // Make the button wider
    justifyContent: 'center',
    alignItems: 'center', // Center the text/icon inside the button
    flexDirection: 'row',
    width: '100%', // Take up full width of its container
  },
  inputLike: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },

  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  termsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 18,
  },
  termsText: {
    fontSize: 12,
    color: '#333',
  },
});

export default BookingForm;
