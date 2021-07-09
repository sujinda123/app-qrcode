import React, { useState } from "react"
import { 
    SafeAreaView, 
    Text, 
    View, 
    TouchableOpacity, 
    Image,
    ImageBackground,
    Dimensions,
    TextInput,
    ActivityIndicator 
  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons  } from '@expo/vector-icons';
import { useMutation } from 'react-apollo-hooks';
import {signIn , getToken, signOut} from '../../util' 

import styleLogin from '../style/styleLogin'
import bgImg from '../../assets/bg.jpg';
import Logo from '../../assets/banner_ict.png';

import { MUTATION_LOGIN } from '../GQL/mutation'

const login = ( { navigation } ) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [show, setShow] = useState(true)
    const onPress = () => setShow(!show)

    const [toggleLike, { loading, error }] = useMutation(MUTATION_LOGIN);
    
    // Login
    const onLogin = async e =>{
        await toggleLike({variables: { Username: username, Password: password },})
        .then(res => {
        // console.log(res.data)
        signIn(res.data.login.token)
        navigation.navigate("Home");
        setUsername(null)
        setUsername(null)
        return res;
        })
        .catch(err =>{
        return err;
        })
    }

    // Check Login
    const chrckLogin = async () => {
    try {
        const value = await getToken();
        if (value !== null) navigation.navigate("Home");
        // console.log(value);
    } catch (error) {
        // console.log(555555555);

    }
    };

    chrckLogin()
    if (loading) return (
        <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>)
    else return (
        <ImageBackground source={bgImg} style={styleLogin.backgroundContainer}>
            {/* StatusBar */}
            <StatusBar style="auto" />
            
            {/* Logo And logoText*/}
            <View style={styleLogin.logoContainer}>
                <Image source={Logo} style={styleLogin.logo}/>
                <Text style={styleLogin.logoText}>Device verification by QR CODE</Text>
            </View>

            <View>
                {error ? 
                    <Text style={styleLogin.errorText}>กรุณาตราจสอบ Username และ Password อีกครั้ง!</Text>
                : <Text></Text>
                }
            </View>

            {/* Input Username*/}
            <View style={styleLogin.inputContainer}>
            <Ionicons name={'md-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styleLogin.inputIcon} />
            <TextInput 
                style={styleLogin.input}
                placeholder={'Username'}
                onChangeText={val => setUsername(val)}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                underlineColorAndroid='transparent'
            />
            </View>

            {/* Input Password And Btn Eye */}
            <View style={styleLogin.inputContainer}>
            <Ionicons name={'md-key'} size={28} color={'rgba(255,255,255,0.7)'} style={styleLogin.inputIcon} />
            <TextInput 
                style={styleLogin.input}
                placeholder={'Password'}
                onChangeText={val => setPassword(val)}
                secureTextEntry={ show }
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styleLogin.btnEye} onPress={onPress}>
                <Ionicons name={ show ? 'md-eye':'md-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
            </TouchableOpacity>
            </View>

            {/* Btn Login */}
            <TouchableOpacity style={{...styleLogin.btnLogin, backgroundColor:'#432577'/*backgroundColor:loading?'#646464':'#432577'*/}} disabled={loading} onPress={onLogin}>
                <Text style={styleLogin.text}>Login</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default login