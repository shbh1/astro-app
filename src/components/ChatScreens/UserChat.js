import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserType} from '../../UserContext';

const UserChat = ({user}) => {
  const navigation = useNavigation();
  const [messagesData, setMessageData] = useState([]);
  const {userId, setUserId} = useContext(UserType);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:2020/messages/${userId}/${user._id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setMessageData(data);
      } else {
        console.log('error in fetching message', response.status.message);
      }
    } catch (error) {
      console.log('error in fetching message', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages(); // Call fetchMessages every second
    }, 2000); //

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const getLastMessage = () => {
    const userMessage = messagesData.filter(
      message => message.messageType === 'text',
    );

    const n = userMessage.length;
    return userMessage[n - 1];
  };

  const lastMessage = getLastMessage();

  console.log(lastMessage);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};

    return new Date(time).toLocaleString('en-US', options);
  };
  const imageUrl =
    'https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg';
  return (
    <View
      style={{
        marginBottom: 5, // Adjust this value to control the space between cards
        borderWidth: 1,
        borderColor: '#9c9595',
      }}>
      <Pressable
        onPress={() =>
          navigation.navigate('ChatMessages', {
            recipientId: user._id,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 25, resizeMode: 'cover'}}
          source={{uri: imageUrl}}
        />

        <View style={{flex: 1}}>
          <Text style={{fontSize: 17, fontWeight: '500', color: '#000000'}}>
            {user?.name}
          </Text>
          {lastMessage && (
            <Text
              style={{
                marginTop: 3,
                color: 'gray',
                fontWeight: 500,
                color: '#585858',
              }}>
              {lastMessage?.message}
            </Text>
          )}
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#585858'}}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
