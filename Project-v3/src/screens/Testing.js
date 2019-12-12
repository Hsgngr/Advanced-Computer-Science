import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 50.82360;
const LONGITUDE = -0.13836;
const LATITUDE_DELTA = 0.090;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const UK_DATA = require('./pp-complete-append-lat-long-notComplete-slim.json');

let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
      ],
      dummyMarkers: [
        {
          coordinate: {
            latitude: 50.8169,
            longitude: -0.1367,
          },
          title: "btn pier",
          price: 500000,
        },
        {
          coordinate: {
            latitude: 50.8289,
            longitude: -0.1410,
          },
          title: "btn station",
          price: 100000,
        },
        {
          coordinate: {
            latitude: 50.8351,
            longitude: -0.1710,
          },
          title: "hove station",
          price: 800000,
        },
      ],
      data: [
        {
          id: UK_DATA.FIELD1,
          Price: UK_DATA.Price,
          Transfer_Date: UK_DATA.Transfer_Date,
          Postcode: UK_DATA.Postcode,
          Property_Type: UK_DATA.Property_Type,
          Old_New: UK_DATA.Old_New,
          Town_City: UK_DATA.Town_City,
          Concat_PAON_Street_Postcode: UK_DATA.Concat_PAON_Street_Postcode,
          coordinate: {
            latitude: UK_DATA.address_lat,
            longitude: UK_DATA.address_long,
          }
        }
      ],
    };
  }

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
          {this.state.data.map(someMarker => (
            <Marker
              key={someMarker.key}
              coordinate={someMarker.coordinate}
              //>pinColor={someMarker.color}
            >
              <View style={styles.priceMarkers}>
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
            <Text>{this.state.data[0].Price}</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

DefaultMarkers.propTypes = {
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
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  priceMarkers: {
    height: 30,
    width: 80,
    borderWidth: 2,
    borderColor: '#FF4500',
    borderRadius: 10/2,
    overflow: 'hidden',
    backgroundColor: '#FF7F50',
  },
  pinStyle: {
    fontColor: '#F0FFFF',
    alignItems: 'center',
  },
});

export default DefaultMarkers;