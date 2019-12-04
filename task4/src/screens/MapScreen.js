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

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 50.82360;
const LONGITUDE = -0.13836;
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

class DataMarkers extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, //prob delete since we don't use activity indictator atm
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      //initialise empty array to eventually hold coords from user map-clicks
      markers: [
      ],
      priceMarkers: [
      ],
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
      sliderValue: 0,
    };
  }

  //when data is loaded from gist, set state array vars with data
  //same code from fetch project-v3
  componentDidMount() {
    return fetch('https://gist.githubusercontent.com/tiffsea/622ed936223af5a987f7a018394cb02c/raw/72360909ad6c55f43669433bfd3de020a8afbc6b/UK_DATA.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          priceMarkers: responseJson.UK_DATA,
        }, function () {});
      })
      .catch((error) => {
      console.error(error);
    });
  }

  //when user clicks map, set finger coords to markers[]; give key id of +1
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

  //playground logic for conditional Slider filter of data; non-f atm
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
          {this.state.priceMarkers.map(someMarker => (
            <Marker
              key={someMarker.FIELD1}
              coordinate={{ latitude: someMarker.address_lat, longitude: someMarker.address_long}}
            >
              <View style={styles.markers}>
                <Text>{someMarker.Price}</Text>
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

DataMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  }
});

export default DataMarkers;