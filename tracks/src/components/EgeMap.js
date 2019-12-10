import React, {useContext} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Dimensions, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import trackerApi from "../api/tracker";
import {Slider} from "react-native-elements";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sliderValue: 10001,
            mapLoaded: false,
            userRegion: {
                latitude: 50.860,
                longitude: -0.0899,
                longitudeDelta: 0.01,
                latitudeDelta: 0.04,
            }
        };

    };

    componentDidMount() {
        this.updateMarkers();
    }

    updateMarkers() {
        let myObj = {sliderValue: this.state.sliderValue}
        trackerApi.post('/locationData3', myObj).then(response => {

            //console.log(response);
            this.setState({
                list: response.data
            })
        }).then(response => {
            this.setState({
                mapLoaded: true
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
                            title={" " + list.AVG_Price + "at " + list.Transfer_Date + ", Postcode: " + list.Postcode}
                            pinColor={list.MarkerColor}
                            onCalloutPress={this.markerClick}>
                            <MapView.Callout>
                                <View style={styles.calloutText}>
                                    <Text> Average Price: {list.AVG_Price}£ | Postcode: {list.Postcode} |
                                        Date: {list.Transfer_Date} </Text>

                                </View>
                            </MapView.Callout>

                        </MapView.Marker> : null
                    ))}

                </MapView>
                <View style={styles.sliderContainer}>
                    <Slider
                        value={this.state.sliderValue}
                        onValueChange={sliderValue => this.setState({sliderValue})}
                        sliderLength={Dimensions.get('window').width}
                        minimumValue={0}
                        maximumValue={400000}
                        minimumTrackTintColor='#FF4500'
                        maximumTrackTintColor='#00CED1'
                        thumbTintColor='#FF7F50'
                        step={1000}
                        onSlidingComplete={() => this.updateMarkers()}
                    />
                    <TouchableOpacity
                        onPress={() => this.updateMarkers()}
                    >
                        <Text>Price: {this.state.sliderValue} £</Text>
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
    sliderContainer: {
        height: 200,
        width: Dimensions.get('window').width-100,
    }
});