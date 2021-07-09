import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  ActivityIndicator, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Separator, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ScrollView, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Alert, 
  Platform } from 'react-native';
import moment from 'moment';
import { Ionicons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery} from 'react-apollo-hooks'
import { QUERY_ASSET_CHECK } from '../GQL/query'

import styleAssetChecked from '../style/styleAssetChecked'

export default function Asset() {
  const { data, error, loading, refetch } = useQuery(QUERY_ASSET_CHECK)
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [numberPackage, setNumberPackage] = useState(null)
  const [modalData, setModalData] = useState(' ');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Asset")} color={Platform.OS == "ios" ? "#fff" : "#164f88" } title=" ย้อนกลับ "/>
      ),
      headerRight: () => (
        <Button onPress={() => refetch()} color="#333333" title="Reload" />
      ),
    });
  }, [navigation]);


  function navigateToDashboard(data) {
    setModalVisible(!modalVisible);
    navigation.navigate("Dashboard",{"data": data});
  }

  // console.log(data)
  refetch()
  if (loading) return (
    <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>)
  else return (
  <SafeAreaView style={styleAssetChecked.container}>
    {/* <StatusBar hidden={true} /> */}
    <StatusBar style="light" />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
            {/* Search number package & Btn closd modal */}
            <View style={styleAssetChecked.centeredView}>
              <View style={styleAssetChecked.modalView}>
                <TouchableOpacity
                  style={styleAssetChecked.closdBtn }
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  activeOpacity={0.8}
                  >
                    <Ionicons name={'md-close-circle-outline'} size={35} color={'#fff'} />
                </TouchableOpacity>
                <ScrollView>
                  <View style={styleAssetChecked.detailDataModal}>
                    <Text style={{...styleAssetChecked.sectionHeader, marginBottom:10, marginTop:10}}>ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</Text>
                    <Text style={styleAssetChecked.txtTitle}>ข้อมูลครุภัณฑ์</Text>
                    <Text style={styleAssetChecked.txtDetail}>หมายเลขครุภัณฑ์ : <Text style={{ fontWeight:'bold' }}>{modalData.ASSET_CODE}</Text></Text>
                    <Text style={styleAssetChecked.txtDetail}>ชื่อ : <Text style={{ fontWeight:'bold' }}>{modalData.ASSET_NAME}</Text></Text>
                    <Text style={styleAssetChecked.txtDetail}>ปริมาณ : {modalData.ASSET_NUMBER}</Text>
                    <Text style={styleAssetChecked.txtDetail}>ต้นทุนต่อหน่วย : {modalData.ASSET_PRICE}</Text>
                    <Text style={styleAssetChecked.txtDetail}>ยี่ห้อ : {modalData.ASSET_BRAND}</Text>
                    <Text style={styleAssetChecked.txtDetail}>โมเดล : {modalData.ASSET_MODEL}</Text>
                    <Text style={styleAssetChecked.txtDetail}>หมายเลขเครื่อง : {modalData.ASSET_SERIALNUMBER}</Text>
                    <Text style={styleAssetChecked.txtDetail}>สถานะ : {modalData.ASSET_STATUS ? modalData.ASSET_STATUS[0].STATUS_NAME : ''}</Text>
                    <Text style={styleAssetChecked.txtDetail}>ผู้รับผิดชอบ : {modalData.ASSET_USER ? modalData.ASSET_USER[0].USER_FIRSTNAME : ''} {modalData.ASSET_USER ? modalData.ASSET_USER[0].USER_LASTNAME : ''}</Text>
                    <Text style={styleAssetChecked.txtDetail}>สถานที่ใช้งาน : {modalData.ASSET_ROOM ? modalData.ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                    <Text style={styleAssetChecked.txtDetail}>สถานที่เดิม : {modalData.ASSET_ORIGINAL_ROOM ? modalData.ASSET_ORIGINAL_ROOM[0].ROOM_NAME : ''}</Text>

                    <Text style={styleAssetChecked.txtTitle}>รูปภาพครุภัณฑ์</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {modalData.ASSET_IMAGES ? modalData.ASSET_IMAGES.map((img, i) => (
                      <Image key={i} source={{ uri: `data:image/jpeg;base64,${img.IMAGE}` }} style={{width: 100, height: 100, margin: 2,}} />
                    )) : ''}
                    </View>
                    <Text style={{fontSize: 20, color: '#606060', margin: 10}}>{modalData.ASSET_COUNT_IMAGES == 0 ? 'ไม่มีรูปภาพ' : ''}</Text>

                    <TouchableOpacity onPress= {()=>navigateToDashboard(modalData)} style={{...styleAssetChecked.btnToDashboard, backgroundColor:'#4b9cb3'}}>
                      <Text style={{ fontSize: 20, color: '#fff', fontWeight:'bold' }}>ตรวจนับ</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
      </Modal>

      {/* <Ionicons name={'md-search'} size={28} color={'#00000080'} style={styleAssetChecked.inputIconNumberPackage} />
      <TextInput 
        style={styleAssetChecked.inputNumberPackage}
        placeholder={'ค้นหาด้วยชื่อหรือหมายเลขครุภัณฑ์'}
        onChangeText={val => setNumberPackage(val)}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        underlineColorAndroid='transparent'
      /> */}
    <ScrollView style={styleAssetChecked.sclMenu}>
      <View style={styleAssetChecked.section}>
        
        <Text style={styleAssetChecked.sectionHeader}>รายการครุภัณฑ์ที่ตรวจนับแล้ว</Text>
        <View style={styleAssetChecked.gallery}>
          {data.getUser.USER_CHECK_ASSET.map((data, i)=> (
            <TouchableOpacity key={i} style={styleAssetChecked.btnMenu} onPress= {()=>{setModalVisible(true),setModalData(data)}}    activeOpacity={0.8}>
              <Text style={{...styleAssetChecked.btnText, fontWeight:'bold'}}>หมายเลข: {data.ASSET_CODE}</Text>
              <Text style={{...styleAssetChecked.btnText, fontWeight:'bold'}}>ชื่อ : {data.ASSET_NAME}</Text>
              <Text style={{...styleAssetChecked.btnText, fontSize: 16.5}}>ตรวจนับเมื่อ : {moment(data.UPDATE_DATE).format('YYYY-MM-DD hh.mm')}</Text>
            </TouchableOpacity>
          ))}
            
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );

}


