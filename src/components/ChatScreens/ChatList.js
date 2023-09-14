import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserType} from '../../UserContext';
import ChatRequest from './ChatRequest';

const ChatList = () => {
  const {userId, setUserId} = useContext(UserType);
  const [chatRequestUsers, setChatRequestUsers] = useState([]); // State to store chat request users

  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:2020/chatList/${userId}`,
      );
      if (response.status === 200) {
        setChatRequestUsers(response.data); // Set the chat request users in the state
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <View style={{padding: 10, marginHorizontal: 12}}>
      {chatRequestUsers.length >= 0 && <Text>Your Chat Request</Text>}
      {chatRequestUsers.map((item, key) => (
        <ChatRequest
          key={key}
          item={item}
          chatRequestUsers={chatRequestUsers}
          setChatRequestUsers={setChatRequestUsers}
        />
      ))}
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
