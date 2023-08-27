import React, {useState, useEffect, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Astrologers = () => {
  const navigation = useNavigation();
  const [astrologerUsers, setAstrologerUsers] = useState([]);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get('http://10.0.2.2:2020/astrologers');
        setAstrologerUsers(response.data);

        console.log(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchAstrologers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000000'}}>
          Astrologers
        </Text>
      ),
    });
  });

  const callUser = user => {
    //console.warn('clicked');
    navigation.navigate('CallingScreen', {user});
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <FlatList
          data={astrologerUsers}
          renderItem={({item}) => (
            <Pressable
              onPress={() => callUser(item)}
              style={styles.astrologerContainer}>
              <Text style={styles.astrologersName}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
  astrologerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#cccc00',
    marginBottom: 10,
  },
  astrologersName: {
    fontSize: 26,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    width: '90%',
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Astrologers;
