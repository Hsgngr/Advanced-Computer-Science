import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from "react-navigation";
import Map from "../components/Map";
import {requestPermissionsAsync} from "expo-location";


const TrackCreateScreen = () => {
    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
        } catch (err) {
            setErr(err);
        }
    };
    useEffect(() => {
        startWatching();
    }, []);
    return (
        <SafeAreaView>
            <Text h2>Create a Track </Text>
            <Map/>
            {err ? <Text>You need to allow location services</Text> : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;