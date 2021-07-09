import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Dimensions, Modal, SafeAreaView, Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons  } from '@expo/vector-icons';
import moment from 'moment';
import { useQuery} from 'react-apollo-hooks'
import { QUERY_ASSET_CHECK } from '../GQL/query'
import { QUERY_SEARCH_ASSET_SCANNER } from '../GQL/query'

import styleScanner from '../style/styleScanner'

const Scanner = ({ navigation }) => {
  // const { data, error, loading, refetch } = useQuery(QUERY_ASSET_CHECK)
  // console.log(data)
  const [numberPackage, setNumberPackage] = useState(" ")
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const queryMultiple = () => {
    const res1 = useQuery(QUERY_ASSET_CHECK)
    const res2 = useQuery(QUERY_SEARCH_ASSET_SCANNER, {
      variables: { ASSET_CODE: numberPackage },
    });
    return [res1, res2];
  }

  const [
    { loading: loading1, data: data1, refetch: refetch1 },
    { loading: loading2, data: data2, refetch: refetch2 }
  ] = queryMultiple()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Asset")} color="#164f88" title=" ย้อนกลับ "/>
      ),
      headerRight: () => (
        <Button onPress={() => refetch1()} color="#333333" title="Reload" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    setScanned(false);
    navigation.navigate("Dashboard",{"data":`${data}`});
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

    const MessageItem = ({data}) => (
    <TouchableOpacity style={{...styleScanner.itemList,backgroundColor:'#f7efca'}} onPress={()=>{ setModalVisible(!modalVisible), navigateToDashboard(data.ASSET_CODE)}} activeOpacity={0.8}>
      <Text style={styleScanner.IDItemList}>รหัส : {data.ASSET_CODE}</Text>
      <Text style={styleScanner.IDItemList}>ชื่อ : <Text style={styleScanner.nameItemList}>{data.ASSET_NAME}</Text></Text>
      <Text >สถานที่ : {data.ASSET_ROOM[0].ROOM_NAME} </Text>
      {/* <Text >ผลการตรวจสอบ : ชำรุด </Text> */}
      <Text >ตรวจนับเมื่อ : {moment(data.UPDATE_DATE).format('YYYY-MM-DD hh.mm')} </Text>
    </TouchableOpacity>
  )
    // การค้นหาครุภัณฑ์
  const onSearch = () => {
    if (loading2) return <Text>Loading...</Text>;
    else return (
      <View>
        {data2.getSearch.length != 0 ? data2.getSearch.map((data,i) => (<MessageItem key={i}  data={data}/>)) : <Text>ไม่พบข้อมูล</Text>}
      </View>
    )
  }

  function navigateToDashboard(data) {
    navigation.navigate("Dashboard",{"data": data});
    
  }
  
  const nav = () => {console.log("Logout pressed")}

  refetch1()
  if (loading1) return (
    <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>)
  else return (
    <SafeAreaView style={{flex: 1,flexDirection: 'column',justifyContent: 'flex-end',backgroundColor:"#000"}}>
      {/* <StatusBar hidden={true} /> */}
      {/* ----------- Modal Search Packet ----------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setNumberPackage(" ")
        }}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } enabled>
            {/* Search number package & Btn closd modal */}
            <View style={styleScanner.headSearchModal}>
              {/* Button closd modal */}
              <TouchableOpacity
                style={styleScanner.closdBtn }
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setNumberPackage(" ")
                }}
                activeOpacity={0.8}
                >
                  <Ionicons name={'md-close-circle-outline'} size={35} color={'#fff'} />
              </TouchableOpacity>
              {/* Icon & Input Number Package */}
              <Ionicons name={'md-search'} size={28} color={'#00000080'} style={styleScanner.inputIconNumberPackage} />
              <TextInput 
                style={styleScanner.inputNumberPackage}
                placeholder={'หมายเลขครุภัณฑ์'}
                onChangeText={val =>  setNumberPackage(val)}
                placeholderTextColor={'rgba(0,0,0,0.8)'}
                underlineColorAndroid='transparent'
              />
              {/* <TouchableOpacity style={styleScanner.btnPackage}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#e0e0e0'}}>
                  <Ionicons name={'md-search'} size={28} color={'#000000'} style={styleScanner.inputIconNumberPackage} />
                </Text>
              </TouchableOpacity> */}

            </View>

            <ScrollView>
              <View style={styleScanner.centeredView}>
                <View style={styleScanner.modalView}>

                  {/* <Text style={styleScanner.modalText}>Hello World!</Text> */}
                  { onSearch() }

                </View>
              </View>
            </ScrollView>

        </KeyboardAvoidingView>
      </Modal>

      {/* <MenuBar/> */}
        

        <BarCodeScanner 
          style={[StyleSheet.absoluteFill, styleScanner.container]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />


          <View style={styleScanner.layerTop}>

          </View>

          <View style={styleScanner.layerCenter}>
            <View style={styleScanner.layerLeft} />
            <View style={styleScanner.focused}>
              <Ionicons name={'md-scan'} size={200}  color={'rgba(0,0,0,0.3)'} style={styleScanner.inputIcon} />
              
            </View>
            
            <View style={styleScanner.layerRight} />
          </View>
          <View style={styleScanner.layerBottom}>

            <TouchableOpacity
              style={styleScanner.openButton}
              onPress={() => {
                setModalVisible(true);
              }}
              activeOpacity={0.8}
              >
              <Text style={styleScanner.txtOpenModalSearch}>ค้นหาด้วยหมายเลขครุภัณฑ์</Text>
            </TouchableOpacity>

            <Text style={styleScanner.titleText}>รายการตรวจเช็คล่าสุด</Text>
            <ScrollView >
              {data1.getUser.USER_CHECK_ASSET.map((data, i)=> (
                <TouchableOpacity key={i} style={{...styleScanner.itemList, backgroundColor: '#c4f3c8'}} onPress={()=>{navigateToDashboard(data)}} activeOpacity={0.8}>
                  <Text style={styleScanner.IDItemList}>รหัส : <Text style={styleScanner.nameItemList}>{data.ASSET_CODE}</Text></Text>
                  <Text style={styleScanner.IDItemList}>ชื่อ : <Text style={styleScanner.nameItemList}>{data.ASSET_NAME}</Text></Text>
                  <Text style={styleScanner.IDItemList}>ผลการตรวจสอบ : <Text style={styleScanner.nameItemList}>{data.ASSET_STATUS ? data.ASSET_STATUS[0].STATUS_NAME : ''}</Text></Text>
                  <Text style={styleScanner.IDItemList}>สถานที่ : {data.ASSET_ROOM ? data.ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                  <Text style={styleScanner.IDItemList}>ตรวจนับเมื่อ : {moment(data.UPDATE_DATE).format('YYYY-MM-DD hh.mm')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView >
          </View>

    </SafeAreaView>
  );
}

export default Scanner