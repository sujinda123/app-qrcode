import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView, Modal, TextInput, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
// import * as Updates from 'expo-updates';
import { useNavigation } from '@react-navigation/native';
import { useQuery} from 'react-apollo-hooks'
import { QUERY_ASSET_NOT_CHECK } from '../GQL/query'
import * as FileSystem from 'expo-file-system';
import styleAssetNotChecked from '../style/styleAssetNotChecked'


const Asset = ({ navigation }) => {
  const { data, error, loading, refetch } = useQuery(QUERY_ASSET_NOT_CHECK)
  // console.log(data)
  // console.log(error)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(' ');
  const [numberPackage, setNumberPackage] = useState(null)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Asset")} color={Platform.OS == "ios" ? "#fff" : "#164f88" } title=" ย้อนกลับ "/>
      ),
    });
  }, [navigation]);

  function navigateToDashboard(data) {
    setModalVisible(!modalVisible);
    navigation.navigate("Dashboard",{"data": data});
    
  }

  const MessageItem = ({data}) => (
    <TouchableOpacity style={{...styleAssetNotChecked.itemList,backgroundColor:'#98e1c9'}} activeOpacity={0.8}>
      <Text style={styleAssetNotChecked.IDItemList}>รหัส : {data.assetNumber}</Text>
      <Text style={styleAssetNotChecked.IDItemList}>ชื่อ : <Text style={styleAssetNotChecked.nameItemList}>{data.assetName}</Text></Text>
      <Text >ผู้รับผิดชอบ : ว่าที่ ร.ต.ญ. หนึ่งฤทัย เตชะ </Text>
      <Text >สถานที่ : ICT1323 </Text>
      {/* <Text >ผลการตรวจสอบ : ชำรุด </Text> */}
      {/* <Text >เวลา : 21-12-63 11:41 </Text> */}
    </TouchableOpacity>
  )

  function navigateToScanner() {
    navigation.navigate("Scanner",{"name":"Himanshu"});
  }

  // const { data, error, loading } = useQuery(QUERY_USER);

  // console.log(data)
  refetch()
  if (loading) return <Text>Loading...</Text>;
  else return (
  <SafeAreaView style={styleAssetNotChecked.container}>
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
            <View style={styleAssetNotChecked.centeredView}>
              <View style={styleAssetNotChecked.modalView}>
                <TouchableOpacity
                  style={styleAssetNotChecked.closdBtn }
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  activeOpacity={0.8}
                  >
                    <Ionicons name={'md-close-circle-outline'} size={35} color={'#fff'} />
                </TouchableOpacity>
                <ScrollView>
                  <View style={styleAssetNotChecked.detailDataModal}>
                    <Text style={{...styleAssetNotChecked.sectionHeader, marginBottom:10, marginTop:10}}>ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</Text>
                    <Text style={styleAssetNotChecked.txtTitle}>ข้อมูลครุภัณฑ์</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>หมายเลขครุภัณฑ์ : <Text style={{ fontWeight:'bold' }}>{modalData.ASSET_CODE}</Text></Text>
                    <Text style={styleAssetNotChecked.txtDetail}>ชื่อ : <Text style={{ fontWeight:'bold' }}>{modalData.ASSET_NAME}</Text></Text>
                    <Text style={styleAssetNotChecked.txtDetail}>ปริมาณ : {modalData.ASSET_NUMBER}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>ต้นทุนต่อหน่วย : {modalData.ASSET_PRICE}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>ยี่ห้อ : {modalData.ASSET_BRAND}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>โมเดล : {modalData.ASSET_MODEL}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>หมายเลขเครื่อง : {modalData.ASSET_SERIALNUMBER}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>สถานะ : {modalData.ASSET_STATUS ? modalData.ASSET_STATUS[0].STATUS_NAME : ''}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>ผู้รับผิดชอบ : {modalData.ASSET_USER ? modalData.ASSET_USER[0].USER_FIRSTNAME : ''} {modalData.ASSET_USER ? modalData.ASSET_USER[0].USER_LASTNAME : ''}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>สถานที่ใช้งาน : {modalData.ASSET_ROOM ? modalData.ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                    <Text style={styleAssetNotChecked.txtDetail}>สถานที่เดิม : {modalData.ASSET_ORIGINAL_ROOM ? modalData.ASSET_ORIGINAL_ROOM[0].ROOM_NAME : ''}</Text>

                    <Text style={styleAssetNotChecked.txtTitle}>รูปภาพครุภัณฑ์</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {modalData.ASSET_IMAGES ? modalData.ASSET_IMAGES.map((img, i) => (
                      <Image key={i} source={{ uri: `data:image/jpeg;base64,${img.IMAGE}` }} style={{width: 100, height: 100, margin: 2,}} />
                    )) : ''}
                    </View>

                    <TouchableOpacity onPress= {()=>navigateToDashboard(modalData)} style={{...styleAssetNotChecked.btnToDashboard, backgroundColor:'#7b9ba5'}}>
                      <Text style={{ fontSize: 20, color: '#fff' }}>ตรวจนับ</Text>
                    </TouchableOpacity>

                  </View>
                </ScrollView>
              </View>
            </View>

      </Modal>

      <Ionicons name={'md-search'} size={28} color={'#00000080'} style={styleAssetNotChecked.inputIconNumberPackage} />
      <TextInput 
        style={styleAssetNotChecked.inputNumberPackage}
        placeholder={'ค้นหาด้วยชื่อหรือหมายเลขครุภัณฑ์'}
        onChangeText={val => setNumberPackage(val)}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        underlineColorAndroid='transparent'
      />
    <ScrollView style={styleAssetNotChecked.sclMenu}>
      <View style={styleAssetNotChecked.section}>
        
        <Text style={styleAssetNotChecked.sectionHeader}>รายการครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</Text>
        <View style={styleAssetNotChecked.gallery}>
          {data.getUser.USER_NOT_CHECK_ASSET.map((data, i)=> (
            <TouchableOpacity key={i} style={styleAssetNotChecked.btnMenu} onPress= {()=>{setModalVisible(true),setModalData(data)}}   activeOpacity={0.8}>
              <Text style={styleAssetNotChecked.btnText}>{data.ASSET_NAME} {data.ASSET_CODE}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );

}
export default Asset 