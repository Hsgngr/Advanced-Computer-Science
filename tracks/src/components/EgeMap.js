import React, {useContext} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Dimensions, ActivityIndicator, Text} from 'react-native';
import trackerApi from "../api/tracker";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            markerColor,
            silderValue=0,
            mapLoaded: false,
            userRegion: {
                latitude: 50.860,
                longitude: -0.0899,
                longitudeDelta: 0.01,
                latitudeDelta: 0.04,
            }
        };

    };

    updateState = (values) => {
        this.setState(values);
    }


    componentDidMount() {
      this.UpdateMarkers();
    }
i
    UpdateMarkers(){
        trackerApi.post('/locationData3', {...this.state.sliderValue}).then(response => {
            //console.log(response);
            this.setState({
                list: response.data
            })
        }).then(response => {
            this.setState({
                mapLoaded:true
            })
        });
    }

    onRegionChangeComplete = (userRegion) => {
        this.setState({userRegion}); //It caused a delay and bugginess in map.
        console.log(userRegion);
        //Make the fetch request here! Post your location and get some points from Database.
    };

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Loading...</Text>
                </View>
            );
        }
       
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.userRegion}
                    //region={this.state.userRegion}
                    style={styles.mapStyle}
                   // onRegionChangeComplete={this.onRegionChangeComplete} //Whenever user stop to change region, sync with setState()
                >
                    
                    {this.state.list.map(list => (
                        list.Latitude && list.Longitude ? <MapView.Marker
                            coordinate={{'latitude': list.Latitude, 'longitude': list.Longitude}}
                            key={list._id}
                            title={" " + list.AVG_Price + "at " + list.Transfer_Date + ", Postcode: " + list.Postcode }
                            pinColor={list.MarkerColor}
                            onCalloutPress={this.markerClick}>
                            <MapView.Callout>
                                <View style={styles.calloutText}>
                                    <Text> Average Price: {list.AVG_Price}£ | Postcode: {list.Postcode} | Date: {list.Transfer_Date} </Text>

                                </View>
                            </MapView.Callout>

                        </MapView.Marker> : null
                    ))}

                </MapView>
                <View style={styles.sliderContainer}>
                    <Slider
                        value={this.state.sliderValue}
                        onValueChange={sliderValue => this.setState({ sliderValue })}
                        minimumValue={0}
                        maximumValue={40000000}
                        minimumTrackTintColor='#FF4500'
                        maximumTrackTintColor='#00CED1'
                        thumbTintColor='#FF7F50'
                        step={1000}
                        onSlidingComplete={() => this.updateMarkers()}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});