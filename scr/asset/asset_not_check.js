import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Separator, TouchableOpacity, Image, Dimensions, ScrollView, Modal, TextInput, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styleAssetNotChecked from '../style/styleAssetNotChecked'

const Asset = ({ navigation }) => {
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
    <TouchableOpacity style={{...styleAssetNotChecked.itemList,backgroundColor:'#98e1c9'}} activeOpacity={0.8}>
      <Text style={styleAssetNotChecked.IDItemList}>รหัส : {data.assetNumber}</Text>
      <Text style={styleAssetNotChecked.IDItemList}>ชื่อ : <Text style={styleAssetNotChecked.nameItemList}>{data.assetName}</Text></Text>
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
    // // if (error) return `Error! ${error.message}`;
    // // if(data.search!=null)
    // //   console.log(data.search)
    // //   var result = data.search.map(person => ({ value: person.id, text: person.assetNumber }));
    // //   console.log(result)
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
  <SafeAreaView style={styleAssetNotChecked.container}>
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
            <View style={styleAssetNotChecked.headSearchModal}>
              {/* Button closd modal */}
              <TouchableOpacity
                style={styleAssetNotChecked.closdBtn }
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                activeOpacity={0.8}
                >
                  <Ionicons name={'md-close-circle-outline'} size={35} color={'#fff'} />
              </TouchableOpacity>
              {/* Icon & Input Number Package */}
              
              {/* <TouchableOpacity style={styleAssetNotChecked.btnPackage}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#e0e0e0'}}>
                  <Ionicons name={'md-search'} size={28} color={'#000000'} style={styleAssetNotChecked.inputIconNumberPackage} />
                </Text>
              </TouchableOpacity> */}

            </View>

            <ScrollView>
              <View style={styleAssetNotChecked.centeredView}>
                <View style={styleAssetNotChecked.modalView}>

                  {/* <Text style={styleAssetNotChecked.modalText}>Hello World!</Text> */}
                  {onSearch()}

                </View>
              </View>
            </ScrollView>

        </KeyboardAvoidingView>
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
          <TouchableOpacity style={styleAssetNotChecked.btnMenu} onPress= {()=>setModalVisible(true)}   activeOpacity={0.8}>
            <Text style={styleAssetNotChecked.btnText}>โต๊ะคอมพิวเตอร์ 100000000000009</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );

}
export default Asset 