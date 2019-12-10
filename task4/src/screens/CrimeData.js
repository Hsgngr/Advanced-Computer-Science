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
      fingerMarkers: [
      ],
      priceMarkers: [
      ],
      filteredMarkers: [
      ],
      sliderValue: 0,
    };
  }

  //when data is loaded from gist, set state array vars with data
  //same code from fetch project-v3
  componentDidMount() {
    return fetch('https://gist.githubusercontent.com/SHAONIAN94/1512f96ecdef0ba6ec1467c488530a35/raw/8002a00d932d2db318324c628387e907cd93c990/CrimeData.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          priceMarkers: responseJson.CrimeData,
        }, function () {});

        this.setState({
          filteredMarkers: responseJson.CrimeData,
        }, function () {});

      })
      .catch((error) => {
      console.error(error);
    });
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

  render() {
    return (
      <View style={styles.container}>
        
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
        >
          {this.state.priceMarkers.map(someMarker => (
            <Marker
              key={someMarker.ID}
              coordinate={{ latitude: someMarker.Latitude, longitude: someMarker.Longitude}}
            >
              <View style={styles.markers}>
                <Text>{someMarker.CrimeCount}</Text>
              </View>
            </Marker>
          ))}
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