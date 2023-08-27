import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import bc from '../../assets/images/bc.jpg';
import Feather from 'react-native-vector-icons/Feather';

const IncomingCallScreen = () => {
  const onDecline = () => {
    console.warn('on decline');
  };

  const onAccept = () => {
    console.warn('on Accept');
  };
  return (
    <ImageBackground source={bc} style={styles.image} resizeMode="cover">
      <Text style={styles.name}>Name</Text>
      <View style={[styles.row, {marginTop: 'auto'}]}>
        {/** Decline button */}
        <Pressable onPress={onDecline} style={styles.iconsContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="#ffffff" size={45} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>
        <View style={styles.iconsContainer}>
          {/** Accept button */}
          <Pressable
            onPress={onAccept}
            style={[
              styles.iconButtonContainer,
              {backgroundColor: '#4e4eff', borderRadius: 50},
            ]}>
            <Feather name="check" color="#ffffff" size={45} />
          </Pressable>
          <Text style={styles.iconText}>Accept</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 100,
    marginBottom: 15,
  },
  image: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: '#ffffff',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: '#ff1a1a',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
});
