import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Modal, SafeAreaView, Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons  } from '@expo/vector-icons';
import moment from 'moment';
import { useQuery} from 'react-apollo-hooks'
import { QUERY_ASSET_CHECK } from '../GQL/query'

import styleScanner from '../style/styleScanner'

const Scanner = ({ navigation }) => {
  const { data, error, loading, refetch } = useQuery(QUERY_ASSET_CHECK)
  // console.log(data)
  const [numberPackage, setNumberPackage] = useState(null)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Asset")} color="#164f88" title=" ย้อนกลับ "/>
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
    <TouchableOpacity style={{...styleScanner.itemList,backgroundColor:'#98e1c9'}} onPress={()=>{ setModalVisible(!modalVisible), navigateToDashboard(data.ASSET_CODE)}} activeOpacity={0.8}>
      <Text style={styleScanner.IDItemList}>รหัส : {data.ASSET_CODE}</Text>
      <Text style={styleScanner.IDItemList}>ชื่อ : <Text style={styleScanner.nameItemList}>{data.ASSET_NAME}</Text></Text>
      <Text >ผู้รับผิดชอบ : ว่าที่ ร.ต.ญ. หนึ่งฤทัย เตชะ </Text>
      <Text >สถานที่ : ICT1323 </Text>
      {/* <Text >ผลการตรวจสอบ : ชำรุด </Text> */}
      {/* <Text >เวลา : 21-12-63 11:41 </Text> */}
    </TouchableOpacity>
  )
    // การค้นหาครุภัณฑ์
  function onSearch() {
    // const { loading, error, data } = useQuery(QUERY_SEARCH, {
    //   variables: { ASSET_CODE: numberPackage },
    // });
    // if (loading) return <Text>Loading...</Text>;
    // // if (error) return `Error! ${error.message}`;
    // // if(data.search!=null)
    //   // console.log(data.getSearch)
    // //   var result = data.search.map(person => ({ value: person.id, text: person.assetNumber }));
    // //   console.log(result)
    // return (
    //   <View>
    //     {data.getSearch != null ? data.getSearch.map((data,i) => (<MessageItem key={i}  data={data}/>)): null}
    //   </View>
    // );
  }

  function navigateToDashboard(data) {
    navigation.navigate("Dashboard",{"data": data});
    
  }
  
  const nav = () => {console.log("Logout pressed")}

  refetch()
  if (loading) return <Text>Loading...</Text>;
  else return (
    <SafeAreaView style={{flex: 1,flexDirection: 'column',justifyContent: 'flex-end',backgroundColor:"#000"}}>
      {/* <StatusBar hidden={true} /> */}
      {/* ----------- Modal Search Packet ----------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } enabled>
            {/* Search number package & Btn closd modal */}
            <View style={styleScanner.headSearchModal}>
              {/* Button closd modal */}
              <TouchableOpacity
                style={styleScanner.closdBtn }
                onPress={() => {
                  setModalVisible(!modalVisible);
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
                onChangeText={val => setNumberPackage(val)}
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
                  {onSearch()}

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
              {data.getUser.USER_CHECK_ASSET.map((data, i)=> (
                <TouchableOpacity key={i} style={styleScanner.itemList} onPress={()=>{navigateToDashboard(data)}} activeOpacity={0.8}>
                  <Text style={styleScanner.IDItemList}>รหัส : <Text style={styleScanner.nameItemList}>{data.ASSET_CODE}</Text></Text>
                  <Text style={styleScanner.IDItemList}>ชื่อ : <Text style={styleScanner.nameItemList}>{data.ASSET_NAME}</Text></Text>
                  <Text style={styleScanner.IDItemList}>ผลการตรวจสอบ : <Text style={styleScanner.nameItemList}>{data.ASSET_STATUS ? data.ASSET_STATUS[0].STATUS_NAME : ''}</Text></Text>
                  <Text style={styleScanner.IDItemList}>สถานที่ : {data.ASSET_ROOM ? data.ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                  <Text style={styleScanner.IDItemList}>เวลา : {moment(data.UPDATE_DATE).format('DD-MM-YYYY hh:mm:ss')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView >
          </View>

    </SafeAreaView>
  );
}

export default Scanner