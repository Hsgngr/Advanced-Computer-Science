import * as React from 'react';
import {Text,StyleSheet,View} from 'react-native';

const Testing = () => {

  //create a separator with style to space shit out
  function Separator() {
      return <View style={styles.separator}/>;
  }

  //main - use the code below to modify as needed
  return (
      
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Some title here
      </Text>

      <Separator/>
    
      <View style={styles.styleGroup}> 
        
        <Text style={styles.anotherGroup}>
          some text here for example
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#00CED1',
  },
  title: {
    color: '#00008B',
    fontSize: 25,
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  styleGroup: {
    padding: 30,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  anotherGroup: {
    color: '#00008B',
    fontSize: 25,
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
  }
});

export default Testing;