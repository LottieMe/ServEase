import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Rate_Screen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    setSubmitted(false);
  };

  const submitRating = () => {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }
    
    setSubmitted(true);
    Alert.alert('Thank you!', `You rated us ${rating} star${rating > 1 ? 's' : ''}`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'), 
      },
    ]);
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity 
          key={i} 
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={40}
            color={i <= rating ? '#FFD700' : '#CCCCCC'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <LinearGradient colors={['#034D9D', '#011837']} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/PP5.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />
        <Text style={styles.title}>Rate Our Service</Text>
        <Text style={styles.subtitle}>How’d we do at your place?</Text>
        
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>

        <View style={styles.bottomText}> 
            <Text style={styles.btmText}>Total Paid</Text>
            <Text style={styles.btmText}>₱325</Text>
         </View>

        {rating > 0 && !submitted && (
          <Text style={styles.ratingText}>You selected: {rating} star{rating > 1 ? 's' : ''}</Text>
        )}

        {submitted ? (
          <Text style={styles.thankYouText}>Thank you for your feedback!</Text>
        ) : (

            
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={submitRating}
            disabled={rating === 0}
          >
           
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'poppins',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
    fontFamily: 'poppins',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'poppins',
  },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 20,
    },
    btmText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'poppins',
    },
  submitButton: {
    backgroundColor: '#FF3D00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'poppins',
  },
  thankYouText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'poppins',
  },
});

export default Rate_Screen;