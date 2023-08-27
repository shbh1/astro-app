import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import CallAction from '../CallAction/CallAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user;
  const goBack = () => {
    navigation.pop();
  };
  return (
    <View style={styles.page}>
      <Pressable style={styles.backButton} onPress={goBack}>
        <AntDesign name="left" size={25} color="#ffffff" />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.name}</Text>
      </View>
      <CallAction />
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    backgroundColor: '#7b4e80',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 50,
  },
  backButton: {
    paddingTop: 25,
    paddingLeft: 15,
  },
});
