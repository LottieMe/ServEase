import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BookingForm from '../components/BookingForm';

const HomeServiceBooking = () => {
  const route = useRoute();
  const { service } = route.params;

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking to save in DB:', bookingData);

    // TODO: Save to SQLite
    Alert.alert('Booked', `Service ID ${bookingData.service_id} booked!`);
  };

  return (
    <View style={styles.container}>
     <BookingForm 
      serviceid={service.id} 
      userid={service.userid} 
      category={service.category} 
      name={service.name} 
      onSubmit={handleBookingSubmit} 
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
});

export default HomeServiceBooking;
