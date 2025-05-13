// Booked_Services.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://salmon-gnu-597967.hostingersite.com/api/bookings';

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch bookings.');

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteBooking(id) },
      ]
    );
  };

  const deleteBooking = async (id) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete booking.');

      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete booking.');
    }
  };

  const handlePayPress = (item) => {
    Alert.alert(
      'Payment Confirmation',
      'Do you want to proceed to payment and rating?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Done',
          onPress: () => navigation.navigate('Rate', { bookingId: item.id }),
        },
      ]
    );
  };

  const convertToAmPm = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.heading}>Booking #{item.id}</Text>
      <Text>Service ID: {item.service_id}</Text>
      <Text>Assigned Person: {item.name || 'TBA'}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {convertToAmPm(item.time)}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contactNumber}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Payment: {item.paymentMethod}</Text>
      <Text>Status: {item.status}</Text>

      <View style={styles.buttonContainer}>
        {/* Pay Button */}
        <View style={styles.buttonSpacing}>
          <Button
            title="Pay"
            color="green"
            onPress={() => handlePayPress(item)}
          />
        </View>

        {/* Delete Button */}
        <View style={styles.buttonSpacing}>
          <Button
            title="Delete"
            color="red"
            onPress={() => confirmDelete(item.id)}
          />
        </View>

        {/* Done Button */}
        <View style={styles.buttonSpacing}>
          <Button title="Done" onPress={() => handlePayPress(item)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSpacing: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default BookingsScreen;
