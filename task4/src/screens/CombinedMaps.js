import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Slider from "react-native-slider";
import MapView, { Marker, ProviderPropType, MAP_TYPES } from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//testing code below; not functional atm
function heatColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class CombinedMaps extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true, //prob delete since we don't use activity indictator atm
      //initialise empty array to eventually hold coords from user map-clicks
      fingerMarkers: [
      ],
      priceMarkers: [
      ],
      filteredMarkers: [
      ],
      sliderValue: 0,
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      myPosition: { 
        latitude: 0,
        longitude: 0,
      },
    };
  }

  watchID: ?number = null

  //when data is loaded from gist, set state array vars with data
  //same code from fetch project-v3
  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
      this.setState({myPosition: initialRegion})
    },

    (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)
        var lastRegion = {
          latitude: lat,
          longitude: long,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA,
        }
        this.setState({initialPosition: lastRegion})
        this.setState({myPosition: lastRegion})
      })

    return fetch('https://gist.githubusercontent.com/tiffsea/622ed936223af5a987f7a018394cb02c/raw/72360909ad6c55f43669433bfd3de020a8afbc6b/UK_DATA.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          priceMarkers: responseJson.UK_DATA,
        }, function () {});

        this.setState({
          filteredMarkers: responseJson.UK_DATA,
        }, function () {});

      })
      .catch((error) => {
      console.error(error);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  //when user clicks map, set finger coords to markers[]; give key id of +1
  //possible deliverable for Task5
  onMapPress(e) {
    this.setState({
      fingerMarkers: [
        ...this.state.fingerMarkers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

  //playground logic for conditional Slider filter of data; non-f atm
  updateMarkers() {
    const priceMarkers = this.state.priceMarkers; 
    var filteredMarkers = this.state.filteredMarkers;
    var newMarkers = [];
    const sliderValue = this.state.sliderValue;
    const minPrice = sliderValue+10000
    const maxPrice = sliderValue-10000
    
    filteredMarkers = []

    for (var i; i < priceMarkers.length; i++){
      if (priceMarkers[i].Price < maxPrice && priceMarkers[i].Price > minPrice){
        newMarkers.push(priceMarkers[i])
      };
    }
    this.setState({
      filteredMarkers: [
        ...this.state.filteredMarkers, 
        {
          address_lat: newMarkers.address_lat,
          address_long: newMarkers.address_long,
          key: newMarkers.FIELD1,
          Price: newMarkers.Price
        }
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <MapView
          provider={this.props.provider}
          style={styles.map}
          region={this.state.initialPosition}
          //initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
        >
          {this.state.fingerMarkers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
          {this.state.filteredMarkers.map(someMarker => (
            <Marker
              key={someMarker.FIELD1}
              coordinate={{ latitude: someMarker.address_lat, longitude: someMarker.address_long}}
            >
              <View style={styles.markers}>
                <Text>{someMarker.Price}</Text>
              </View>
            </Marker>
          ))}
            <Marker
              coordinate={this.state.myPosition}>
              <View style={styles.radius}>
                <View style={styles.marker}></View>
              </View>
            </Marker>
         </MapView>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ fingerMarkers: [] })}
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
            //onSlidingComplete={() => this.updateMarkers()} //{() => this.setState({priceMarkers:[]})}
          />
          
          <TouchableOpacity
            style={styles.bubble}
            //onPress={() => this.updateMarkers()}
          >
            <Text>Price: {this.state.sliderValue}</Text>
          </TouchableOpacity>

          <View style={[styles.bubble, styles.latlng]}>
            <Text style={styles.centeredText}>
              {this.state.initialPosition.latitude.toPrecision(7)},
              {this.state.initialPosition.longitude.toPrecision(7)},
              Current Location
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

CombinedMaps.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex:1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  markers: {
    height: 30,
    width: 100,
    borderWidth: 2,
    borderColor: '#FF4500',
    borderRadius: 10/2,
    overflow: 'hidden',
    backgroundColor: '#FF7F50',
  },
  sliderContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  centeredText: { 
    textAlign: 'center' 
  },
  marker: {
    height: 10,
    width: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  radius: {
    height: 30,
    width: 30,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,1.0)',
    borderWidth: 1,
    borderColor: 'rgba(0,112, 255,1.0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CombinedMaps;