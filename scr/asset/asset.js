import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import { useQuery} from 'react-apollo-hooks'
import { QUERY_ASSET_NUM } from '../GQL/query'
import { signOut,getToken } from '../../util' 

import styleAsset from '../style/styleAsset'

const asset = ({ navigation }) =>{
    const { data, error, loading, refetch } = useQuery(QUERY_ASSET_NUM)
    try {
        if(error) error.graphQLErrors.forEach(async ({ message }) => {if(message == "LoginFalse") {
            await signOut()
            const value = await getToken();
            if (value == null) navigation.navigate("Login")
        }})
    } catch (error) {
    // handle error
    }
    // console.log(data)
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.navigate("Home")} color={Platform.OS == "ios" ? "#fff" : "#164f88" } title=" ย้อนกลับ "/>
        ),
        headerRight: () => (
            <Button onPress={() => refetch()} color="#333333" title="Reload" />
          ),
      });
    }, [navigation]);

    function navigateToScanner() {
        navigation.navigate("Scanner",{"name":"Scanner"});
    }
    function navigateToChecked() {
        navigation.navigate("AssetChecked",{"name":"AssetChecked"});
    }
    function navigateToNotCheck() {
        navigation.navigate("AssetNotChecked",{"name":"AssetNotChecked"});
    }
    
    refetch()
    if (loading) return (
        <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>)
    else return (
        <SafeAreaView style={styleAsset.container}>
{/* <StatusBar hidden={true} /> */}
    <StatusBar style="light" />
        <ScrollView style={styleAsset.sclMenu}>
        <View style={styleAsset.section}>
            <Text style={styleAsset.sectionHeader}>รายการทั้งหมด</Text>
            <View style={styleAsset.gallery}>
            <TouchableOpacity onPress= {()=>navigateToChecked()}  style={styleAsset.btnMenu} activeOpacity={0.8}>
                <Text style={styleAsset.btnText}>ครุภัณฑ์ที่ตรวจนับแล้ว</Text>
                <Text style={{...styleAsset.btnText,...styleAsset.textCheck}}>{loading ? ' ' : data.getUser.USER_ASSET_NUM_CHECK}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress= {()=>navigateToNotCheck()} style={styleAsset.btnMenu} activeOpacity={0.8}>
                <Text style={styleAsset.btnText}>ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</Text>
                <Text style={{...styleAsset.btnText,...styleAsset.textNotCheck}}>{loading ? ' ' : data.getUser.USER_ASSET_NUM_NOT_CHECK}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress= {()=>navigateToScanner()} style={styleAsset.btnMenu} activeOpacity={0.8}>
                <Text style={styleAsset.btnText}>สแกนเพื่อตรวจนับ</Text>
                <Text style={styleAsset.btnText}>
                    <Ionicons name={'md-qr-code-outline'} size={30}  color={'#455054'} style={styleAsset.inputIcon} />
                </Text>
                
            </TouchableOpacity>

            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default asset