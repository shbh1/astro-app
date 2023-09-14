import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserType} from '../UserContext';
import {Chip} from 'react-native-paper';

const Astrologers = () => {
  const navigation = useNavigation();
  const [astrologerUsers, setAstrologerUsers] = useState([]);
  const {userId, setuserId} = useContext(UserType);
  const [isLoading, setIsLoading] = useState(true);
  const [requestSent, setSentRequest] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      // Set headerLeft to null to remove the back button
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="menu" size={24} color={'#000000'} />
          <Text style={{marginLeft: 38, fontSize: 18, color: '#000000'}}>
            Chat with astrologers
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: '#000000',
              height: 30,
              width: 40,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              flex: 1,
            }}>
            <Text style={{color: '#000000', flexWrap: 'wrap'}}>₹ 0</Text>
          </View>
          <Ionicons name="search-outline" size={24} color={'#000000'} />
          <AntDesign name="filter" size={24} color={'#000000'} />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const response = await axios.get('http://10.0.2.2:2020/astrologers');
        const usersWithButtonState = response.data.map(user => ({
          ...user,
          isButtonDisabled: false,
        }));
        setAstrologerUsers(usersWithButtonState);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
      }
    }

    fetchAstrologers();
  }, []);

  // const callUser = user => {
  //   navigation.navigate('CallingScreen', {user});
  // };

  // const handleRequest = async (currentId, selectedUserId) => {
  //   if (isRequestSent) {
  //     Alert.alert('Request Already Sent', 'You have already sent a request.');
  //     return;
  //   }
  //   try {
  //     const response = await axios.post('http://10.0.2.2:2020/request', {
  //       currentId,
  //       selectedUserId,
  //     });

  //     if (response.status === 200) {
  //       Alert.alert('Request Sent', 'Your request has been sent successfully.');

  //       setSentRequest(true);
  //       setIsButtonDisabled(true);
  //       setIsRequestSent(true);
  //     }
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  // };

  const handleRequest = async (currentId, selectedUserId) => {
    // Find the index of the user by selectedUserId
    const userIndex = astrologerUsers.findIndex(
      user => user._id === selectedUserId,
    );

    if (userIndex === -1) {
      // User not found, handle this case as needed
      return;
    }

    if (astrologerUsers[userIndex].isButtonDisabled) {
      Alert.alert('Request Already Sent', 'You have already sent a request.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:2020/request', {
        currentId,
        selectedUserId,
      });

      if (response.status === 200) {
        Alert.alert('Request Sent', 'Your request has been sent successfully.');

        // Create a new array with updated user state
        const updatedUsers = [...astrologerUsers];
        updatedUsers[userIndex].isButtonDisabled = true;

        // Update the state with the new array
        setAstrologerUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  const categories = [
    'Offers',
    'Love',
    'Education',
    'Career',
    'Marriage',
    'Health',
  ];
  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {categories.map(cat => (
          <Chip
            key={cat}
            mode="outlined"
            style={{marginHorizontal: 5, marginVertical: 5}}
            textStyle={{fontWeight: '400', color: '#000000', padding: 1}}>
            {cat}
          </Chip>
        ))}
      </View>
      <View style={styles.page}>
        <FlatList
          data={astrologerUsers}
          renderItem={({item}) => (
            <View style={styles.astrologerContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{uri: imageUrl}} // Set the image URL as the source
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 70,
                    borderColor: '#FBE300',
                    borderWidth: 3,
                  }} // Define the width and height of the image
                />
                <View style={{}}>
                  <Text style={styles.astrologersName}>{item.name}</Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    {item.skills.join(', ')}
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    {item.languages.join(', ')}
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    Exp: {item.yearsOfExperience} years
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleRequest(userId, item._id)}
                    style={[
                      styles.button,
                      isButtonDisabled && {backgroundColor: '#CCCCCC'},
                    ]}
                    disabled={isButtonDisabled}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>

                  <View style={{height: 10}} />

                  <TouchableOpacity
                    onPress={() => navigation.navigate('ChatScreen')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Chat</Text>
                  </TouchableOpacity>
                  {/* <Ionicons
                    onPress={() => callUser(item)}
                    name="videocam"
                    size={35}
                    color={'#2b83e2'}
                  /> */}
                </View>
              </View>
            </View>
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
    marginTop: -11,
  },
  astrologerContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 13,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  astrologersName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000000',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    width: 80, // Set the width to your desired value
    height: 40, // Increase the height to make the button longer
    borderRadius: 10,
    borderColor: '#007300',
    borderWidth: 1,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: '#007300',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Astrologers;
