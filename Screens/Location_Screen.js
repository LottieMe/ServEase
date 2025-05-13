import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const { height } = Dimensions.get('window');

const Location_Screen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.timing(panY, {
            toValue: height * 0.5,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsModalVisible(false));
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {isModalVisible && (
        <Animated.View style={[styles.modal, { transform: [{ translateY: panY }] }]}>
          <View style={styles.dragHandle} {...panResponder.panHandlers} />

          <View style={styles.modalContent}>
            <View style={styles.section1}>
              <Image style={styles.img} source={require('../assets/PP5.png')} />
              <View style={styles.Info}>
                <Text style={styles.title}>Sarah Johnson</Text>
                <Text style={styles.subtitle}>Expert houses cleaner and organiser</Text>
              </View>
              <MaterialCommunityIcons style={styles.phoneIcon} name='phone' size={30} color='#034D9D' />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Service Address</Text>
              <Text style={styles.sectionText}>EN 18 Set 30 San Banshore, Queen City</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Time</Text>
              <Text style={styles.sectionText}>3:00PM (Max. 30 min)</Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.btnBook}
              onPress={() => {
                console.log("Book button pressed");
                setTimeout(() => navigation.navigate('Rate'), 100);
              }}
            >
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {!isModalVisible && (
        <TouchableOpacity
          style={styles.showModalButton}
          onPress={() => {
            setIsModalVisible(true);
            panY.setValue(0);
          }}
        >
          <Text style={styles.showModalButtonText}>Show Info</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalContent: {
    flex: 1,
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  img: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  Info: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '65%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  phoneIcon: {
    flex: 1,
    marginLeft: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  bookText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  btnBook: {
    zIndex: 100,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
  },
  showModalButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  showModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Location_Screen;
