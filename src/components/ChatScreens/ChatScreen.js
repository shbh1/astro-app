import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import UserChat from './UserChat';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatScreen = () => {
  const [acceptedChat, setAcceptedChat] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedChatList = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:2020/acceptedChatList/${userId}`,
        );

        if (response.status === 200) {
          // Extract unique user IDs using a Set
          const uniqueUserIds = new Set(response.data.map(user => user._id));
          // Convert the Set back to an array
          const uniqueUsers = Array.from(uniqueUserIds).map(userId => {
            // Find the user with the matching ID
            return response.data.find(user => user._id === userId);
          });

          setAcceptedChat(uniqueUsers);
        }
      } catch (error) {
        console.log('Error in showing chat list', error);
      }
    };
    acceptedChatList();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 20,
              color: '#000000',
              fontWeight: '500',
            }}>
            Messages
          </Text>
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedChat.map((user, index) => (
          <UserChat key={index} user={user} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatScreen;
