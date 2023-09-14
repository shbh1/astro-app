import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext} from 'react';
import axios from 'axios';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';

const ChatRequest = ({item, chatRequestUsers, setChatRequestUsers}) => {
  const {userId, setUserId} = useContext(UserType);

  const navigation = useNavigation();

  const acceptRequest = async chatRequestId => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:2020/chatRequest/accept',
        {senderId: chatRequestId, recipientId: userId},
      );

      if (response.ok) {
        setChatRequestUsers(
          chatRequestUsers.filter(request => request._Id !== chatRequestId),
        );
      }
      navigation.navigate('ChatScreen');
    } catch (error) {
      console.log('error accepting the request', error);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, flex: 1}}>
        {item?.name} sent you chat requset !!!
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{
          backgroundColor: '#0066B2',
          padding: 10,
          borderRadius: 6,
        }}>
        <Text
          style={{textAlign: 'center', color: '#ffffff', fontWeight: 'bold'}}>
          Accept
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default ChatRequest;

const styles = StyleSheet.create({});
