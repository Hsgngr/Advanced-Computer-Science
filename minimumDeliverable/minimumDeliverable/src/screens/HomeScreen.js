import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';

const HomeScreen = props => {
  return (
  <View>
      <Text style={styles.container}>Welcome to the Good Place</Text>
      <Button 
        onPress= {() => props.navigation.navigate('Navigation')} 
        title= "Navigation" 
        />
        
      <Button 
        onPress= {() => props.navigation.navigate('Credits')} 
        title= "About Us" 
        />
      
      
        
  </View> 
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25
  },
  container: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center'
  
  }
});

export default HomeScreen;
