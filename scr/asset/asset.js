import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';

import styleAsset from '../style/styleAsset'

const asset = ({ navigation }) =>{
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.navigate("Home")} color={Platform.OS == "ios" ? "#fff" : "#164f88" } title=" ย้อนกลับ "/>
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

    return(
        <SafeAreaView style={styleAsset.container}>
{/* <StatusBar hidden={true} /> */}
    <StatusBar style="light" />
        <ScrollView style={styleAsset.sclMenu}>
        <View style={styleAsset.section}>
            <Text style={styleAsset.sectionHeader}>รายการทั้งหมด</Text>
            <View style={styleAsset.gallery}>
            <TouchableOpacity onPress= {()=>navigateToChecked()}  style={styleAsset.btnMenu} activeOpacity={0.8}>
                <Text style={styleAsset.btnText}>ครุภัณฑ์ที่ตรวจนับแล้ว</Text>
                <Text style={{...styleAsset.btnText,...styleAsset.textCheck}}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress= {()=>navigateToNotCheck()} style={styleAsset.btnMenu} activeOpacity={0.8}>
                <Text style={styleAsset.btnText}>ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</Text>
                <Text style={{...styleAsset.btnText,...styleAsset.textNotCheck}}>1</Text>
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