import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallStatus,
  ZegoDataRecordType,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';

const MakeCall = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params;

  // Create userName without spaces and convert to lowercase
  const formattedUserName = user.userName.replace(/\s+/g, '').toLowerCase();

  useEffect(() => {
    const appID = '1200099111';
    const appSign =
      'ca4ec0f7eb76ca54f871fb728e0fd3ad06d6698a4ab0243a1a98a070279c6508';
    // Initialize the call service
    ZegoUIKitPrebuiltCallService.init(
      appID, // Your app ID
      appSign, // Your app sign
      formattedUserName, // Use the formatted userName without spaces
      user.userName, // Keep the original user name for display
      [], // Other configurations if needed
      {
        callStatusUpdate: (status, roomID) => {
          // Handle call status updates (e.g., incoming call)
          if (status === ZegoCallStatus.CallIncoming) {
            // Display incoming call UI
          }
        },
        onVideoTalkDataRecord: record => {
          // Handle video talk data records
          if (record.type === ZegoDataRecordType.Reject) {
            // Handle rejection of the call
          }
        },
        // ... Other callbacks if needed
      },
    );

    return () => {
      // Clean up when the component unmounts
      ZegoUIKitPrebuiltCallService.logout();
    };
  }, [formattedUserName, user.userName]);

  // Rest of your code...
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MakeCall;
