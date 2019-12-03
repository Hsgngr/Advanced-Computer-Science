import React from "react";
import {Text, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";

const Map = () =>{
  return (
      <MapView style={styles.Map}
      initialRegion={{
          latitude: 50.860,
          longitude: -0.0899,
          longitudeDelta: 0.01,
          latitudeDelta: 0.04,
      }}
      >
      </MapView>
  );
};


const styles= StyleSheet.create({
    Map: {
        height:300,
    }
});

export default Map;