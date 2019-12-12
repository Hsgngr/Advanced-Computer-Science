import * as React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
//import {Card} from 'react-native-paper';
import {Button} from 'react-native-elements';

const HomeScreen = props => {

  function Separator() {
      return <View style={styles.separator}/>;
  }

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={require('../../assets/Logo.png')}>
          <Text style={styles.title}>
            Group 4 Project
          </Text>
          <Separator/>
          <View style={styles.btns}>
            <Button 
              onPress= {() => props.navigation.navigate('MapScreen')} 
              title= "UK Housing Prices Map"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('SignupScreen')} 
              title= "Sign Up"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('SigninScreen')} 
              title= "Sign In"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('FingerTracking')} 
              title= "Finger Tracking"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('CurrentLocation')} 
              title= "Current Location"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('TestCases')} 
              title= "Test Cases"
              type="solid"
            />
            <Separator/>
            <Button 
              onPress= {() => props.navigation.navigate('CombinedMaps')} 
              title= "Combined Maps"
              type="solid"
            />
          </View>
        </ImageBackground> 
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#00CED1',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#00008B',
    fontSize: 25,
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btns: {
    //margin: 50,
    padding: 30,
    //fontSize: 50,
    alignSelf: 'center',
    //flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
  }
});

export default HomeScreen;