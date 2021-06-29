import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView, Modal, TextInput, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styleAssetChecked from '../style/styleAssetChecked'

export default function Asset() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [numberPackage, setNumberPackage] = useState(null)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Asset")} color={Platform.OS == "ios" ? "#fff" : "#164f88" } title=" ย้อนกลับ "/>
      ),
    });
  }, [navigation]);

  const MessageItem = ({data}) => (
    <TouchableOpacity style={{...styleAssetChecked.itemList,backgroundColor:'#98e1c9'}} activeOpacity={0.8}>
      <Text style={styleAssetChecked.IDItemList}>รหัส : {data.assetNumber}</Text>
      <Text style={styleAssetChecked.IDItemList}>ชื่อ : <Text style={styleAssetChecked.nameItemList}>{data.assetName}</Text></Text>
      <Text >ผู้รับผิดชอบ : ว่าที่ ร.ต.ญ. หนึ่งฤทัย เตชะ </Text>
      <Text >สถานที่ : ICT1323 </Text>
      {/* <Text >ผลการตรวจสอบ : ชำรุด </Text> */}
      {/* <Text >เวลา : 21-12-63 11:41 </Text> */}
    </TouchableOpacity>
  )

  function onSearch() {
    // const { loading, error, data } = useQuery(QUERY_SEARCH, {
    //   variables: { assetNumber: numberPackage },
    // });
    // if (loading) return <Text>Loading...</Text>;
    // return (
    //   <View>
    //     {data.search != null ? data.search.map((data,i) => (<MessageItem key={i}  data={data}/>)): null}
    //   </View>
    // );
  }

  function navigateToScanner() {
    navigation.navigate("Scanner",{"name":"Himanshu"});
  }

  // const { data, error, loading } = useQuery(QUERY_USER);

  // console.log(data)

  return (
  <SafeAreaView style={styleAssetChecked.container}>
    {/* <StatusBar hidden={true} /> */}
    <StatusBar style="light" />

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } enabled>
            {/* Search number package & Btn closd modal */}
            <View style={styleAssetChecked.headSearchModal}>
              {/* Button closd modal */}
              <TouchableOpacity
                style={styleAssetChecked.closdBtn }
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                activeOpacity={0.8}
                >
                  <Ionicons name={'md-close-circle-outline'} size={35} color={'#fff'} />
              </TouchableOpacity>
              {/* Icon & Input Number Package */}
              
              {/* <TouchableOpacity style={styleAssetChecked.btnPackage}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#e0e0e0'}}>
                  <Ionicons name={'md-search'} size={28} color={'#000000'} style={styleAssetChecked.inputIconNumberPackage} />
                </Text>
              </TouchableOpacity> */}

            </View>

            <ScrollView>
              <View style={styleAssetChecked.centeredView}>
                <View style={styleAssetChecked.modalView}>

                  {/* <Text style={styleAssetChecked.modalText}>Hello World!</Text> */}
                  {onSearch()}

                </View>
              </View>
            </ScrollView>

        </KeyboardAvoidingView>
      </Modal>

      <Ionicons name={'md-search'} size={28} color={'#00000080'} style={styleAssetChecked.inputIconNumberPackage} />
      <TextInput 
        style={styleAssetChecked.inputNumberPackage}
        placeholder={'ค้นหาด้วยชื่อหรือหมายเลขครุภัณฑ์'}
        onChangeText={val => setNumberPackage(val)}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        underlineColorAndroid='transparent'
      />
    <ScrollView style={styleAssetChecked.sclMenu}>
      <View style={styleAssetChecked.section}>
        
        <Text style={styleAssetChecked.sectionHeader}>รายการครุภัณฑ์ที่ตรวจนับแล้ว</Text>
        <View style={styleAssetChecked.gallery}>
          <TouchableOpacity style={styleAssetChecked.btnMenu} onPress= {()=>setModalVisible(true)}   activeOpacity={0.8}>
            <Text style={styleAssetChecked.btnText}>โต๊ะคอมพิวเตอร์ 100000000000009</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );

}


