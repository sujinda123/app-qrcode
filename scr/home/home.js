import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';

import { signOut,getToken } from '../../util' 
import { useQuery} from 'react-apollo-hooks'
import { QUERY_USER } from '../GQL/query'

import styleHome from '../style/styleHome'

const Home = ( { navigation } ) => {
    function navigateToAsset() {
        navigation.navigate("Asset",{"name":"Asset"});
    }
    const btnLogout = async () => {
        try {
        await signOut();
        // console.log(await getToken())
        const value = await getToken();
        if (value == null) navigation.navigate("Login")
        // console.log(value);
      } catch (error) {}
    };
    const { data, error, loading } = useQuery(QUERY_USER)
    return(
        <SafeAreaView style={styleHome.container}>
            <StatusBar style="light" />
            <View style={styleHome.userData}>
                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold'}}>ชื่อผู้ใช้ : {/*loading ? 'Loading...' : data.getUser.USER_FIRSTNAME + " " + data.getUser.USER_LASTNAME*/}</Text>
                <Text style={{ fontSize: 18, color: '#000' }}>หน่วยงาน : {/*loading ? 'Loading..' : data.getUser.USER_LASTNAME*/}</Text>
            </View>
            <ScrollView style={styleHome.sclMenu}>
                <View style={styleHome.section}>
                    <Text style={styleHome.sectionHeader}>รายการทั้งหมด</Text>
                    <View style={styleHome.gallery}>
                    <TouchableOpacity /*onPress= {()=>navigateToScanner()}*/ style={styleHome.btnMenu} activeOpacity={0.8}>
                        <Ionicons name={'md-document-outline'} size={80}  color={'#455054'} style={styleHome.inputIcon} />
                        <Text style={{ fontSize: 20, color: '#455054', fontWeight:'bold'  }}>ดูข้อมูลครุภัณฑ์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {()=>navigateToAsset()} style={styleHome.btnMenu} activeOpacity={0.8}>
                        <Ionicons name={'md-checkbox-outline'} size={80}  color={'#455054'} style={styleHome.inputIcon} />
                        <Text style={{ fontSize: 20, color: '#455054', fontWeight:'bold'  }}>ตรวจนับครุภัณฑ์</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress= {btnLogout} style={styleHome.btnLogout}>
                <Text  style={styleHome.txtLogout}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home