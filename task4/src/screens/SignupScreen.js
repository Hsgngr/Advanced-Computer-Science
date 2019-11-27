import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from "../components/Spacer";

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4> Sign Up for Unique Experience </Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize={"none"}
                autoCorrect={false}
            />
            <Spacer/>
            <Input
                secureTextEntry={true} //This is for keeping secure, replacing with dots.
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize={"none"}
                autoCorrect={false}
            />
            <Spacer>
                <Button title="Sign Up"/>
            </Spacer>
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};

// SignupScreen.navigationOptions = {   //Bu şekilde de yazılıyor. Bu object, diğeri de function which returns object
//     header: null
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //vertically ortala
        marginBottom: 200
    }
});

export default SignupScreen;