import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Slider from "react-native-slider";
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

//this is from ege code - returns error when app is loaded (had to comment out)
//import {Context as LocationContext} from "../context/LocationContext";

//set the coordinates to BTN initally - should change this to user current location eventually
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 50.82360;
const LONGITUDE = -0.13836;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0; //for random markers

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//testing code below; not functional atm
function heatColor() {
  //if price is at x limit, return color 
}

class DataMarkers extends React.Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      //region updated frequently with map markers
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      //initialise marker array with blank values initially
      //we will populate this array when use clicks map - see onMapPress() function
      markers: [
      ],
      //dummy array used as playground to display some JSON coords
      priceMarkers: [],
      //dummy data used as playground to display some arbitrary BTN coords
      dummyMarkers: [
        {
          coordinate: {
            latitude: 50.8169,
            longitude: -0.1367,
          },
          title: "btn pier",
          price: 80000,
        },
        {
          coordinate: {
            latitude: 50.8289,
            longitude: -0.1410,
          },
          title: "btn station",
          price: 500000,
        },
        {
          coordinate: {
            latitude: 50.8351,
            longitude: -0.1710,
          },
          title: "hove station",
          price: 100000,
        },
      ],
      //get number of slider at each increment of slider bar
      //useful var for filtering data from MongoDB to pull only items within the slected range
      sliderValue: 0,
      //not sure?
      testData: [],
    };
  }

//do (place random colored marker at coordinate of finger selection) when user touches map
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

//logic playground for placing markers on map when a SliderValue is seleted. Non-func atm
  updateMarkers() {
    const dummyMarkers = this.state.dummyMarkers; 
    const sliderValue = this.state.sliderValue;
    const newMarkers = [];
    
    for (var i; i < dummyMarkers.length; i++){
      if (dummyMarkers[i].price < sliderValue+10000){
        newMarkers.push(dummyMarkers[i])
      };
    }
    this.setState({
      priceMarkers: [
        ...this.state.priceMarkers, 
        {
          newMarkers
        }
      ]
    });
  }

//do everything - render function is called "reactively" when user does something
  render() {
    return (
      <View style={styles.container}>
        
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
          {this.state.dummyMarkers.map(someMarker => (
            <Marker
              key={someMarker.key}
              coordinate={someMarker.coordinate}
            >
              <View style={styles.priceMarkers}>
                <Text>{someMarker.price}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>tap map to insert marker</Text>
            <Text>tap here to erase</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            value={this.state.sliderValue} //update state every time slider is moved
            onValueChange={sliderValue => this.setState({ sliderValue })} //when slider finishes, update value; we need this to use for price filtering
            minimumValue={0} //slider min
            maximumValue={1000000} //slider max
            minimumTrackTintColor='#FF4500' //slider color-left
            maximumTrackTintColor='#00CED1' //slider color-right
            thumbTintColor='#FF7F50' //slider color-ball
            step={1000} //gets the increment size
          />
          <TouchableOpacity
            style={styles.bubble}
            //onPress={() => this.updateMarkers()}
          >
            <Text>Price: {this.state.sliderValue}</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
//copied from react-native-maps
DataMarkers.propTypes = {
  provider: ProviderPropType,
};

//set the styles of our react-native components
const styles = StyleSheet.create({
  //styles for entire render app
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  //styles for our react-native-map; taken from react-native
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  //styles for the transparent button
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  //can delete possibly?
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  //can delete possibly?
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  //styles for displaying buttons
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  //styles for markers
  priceMarkers: {
    height: 30,
    width: 100,
    borderWidth: 2,
    borderColor: '#FF4500',
    borderRadius: 10/2,
    overflow: 'hidden',
    backgroundColor: '#FF7F50',
  },
  //styles for react-native-slider; taken from react-native
  sliderContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

//export all - essential for deploying app
export default DataMarkers;