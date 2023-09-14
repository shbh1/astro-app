import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const AstroHome = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          Home
        </Text>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Ionicons
            onPress={() => navigation.navigate('ChatScreen')}
            name="chatbox-ellipses-outline"
            size={30}
            color={'#000000'}
          />
          <Ionicons
            onPress={() => navigation.navigate('ChatList')}
            name="people-sharp"
            size={30}
            color={'#000000'}
          />
        </View>
      ),
    });
  });

  return (
    <View>
      <Text>AstroHome</Text>
    </View>
  );
};

export default AstroHome;

const styles = StyleSheet.create({});
