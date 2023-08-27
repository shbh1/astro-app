import React from "react"

import {View, FlatList, Text, StyleSheet} from "react-native"
const ContactScreen= ()=>{
    return (
        <View style={styles.page}>
        <FlatList
          data={astrologerUsers}
          renderItem={({item}) => (
            <View style={styles.astrologerContainer}>
              <Text style={styles.astrologersName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item._id} // Add a unique key extractor
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
}