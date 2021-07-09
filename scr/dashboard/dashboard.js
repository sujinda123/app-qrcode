import React, { useState, useEffect, useRef} from 'react';
import { 
  ActivityIndicator,
  SafeAreaView, 
  Text, 
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
  Dimensions
 } from 'react-native';
//  import RNPickerSelect from 'react-native-picker-select';
 import {Picker} from '@react-native-community/picker';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')
import { Camera } from 'expo-camera';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons  } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import styleDashboard from '../style/styleDashboard'
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { useMutation, useQuery } from 'react-apollo-hooks';

import { MUTATION_IMAGE_UPLOAD } from '../GQL/mutation'
import { MUTATION_UPDATE_STATUS_ASSET } from '../GQL/mutation'
import { MUTATION_DELETE_IMAGE_ASSET } from '../GQL/mutation'
import { QUERY_ASSET_PRIVILEGE } from '../GQL/query'
import { QUERY_SEARCH_ASSET } from '../GQL/query'

const Dashboard = ({ navigation }) => {
    const route = useRoute();
    const [numberPackage] = useState(route.params.data.ASSET_CODE)
    const [uploadImage] = useMutation(MUTATION_IMAGE_UPLOAD);
    const [updateStatusAsset] = useMutation(MUTATION_UPDATE_STATUS_ASSET);
    const [deleteImageAsset] = useMutation(MUTATION_DELETE_IMAGE_ASSET);

    const queryMultiple = () => {
      const res1 = useQuery(QUERY_ASSET_PRIVILEGE)
      const res2 = useQuery(QUERY_SEARCH_ASSET, {
        variables: { ASSET_CODE: numberPackage },
      });
      return [res1, res2];
    }
    const [
      { loading: loading1, data: data1, refetch: refetch1 },
      { loading: loading2, data: data2, refetch: refetch2 }
    ] = queryMultiple()

    refetch1()
    refetch2()
    const [selectedStatusAsset, setSelectedStatusAsset] = useState(1);
    const [startCamera, setStartCamera] = useState(false)
    const [editImage, setEditImage] = useState(false)
    const [viewImage, setViewImage] = useState([])
    const [viewImageEx, setViewImageEx] = useState([])
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    const [image, setImage] = useState([]);
    const [statusSave, setStatusSave] = useState(false);
    const cam = useRef(null)

    const __startCamera = async () => {
      const {status} = await Camera.requestPermissionsAsync()
      // console.log(status)
      if (status === 'granted') {
        setStartCamera(true)
      } else {
        Alert.alert('Access denied')
      }
    }

    const _takePicture = async () => {
      let photo = await cam.current.takePictureAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        // aspect: [3, 3],
        quality: 0.5,
      })
      // console.log(cam.current.getSupportedRatiosAsync())
      const source = photo.uri
      if(source){
        // console.log(source)
        handleSave(source)
        pickImage()
      }
    }

    const handleSave = async (photo) => {
      const { status } = await Camera.requestPermissionsAsync()
      if (status === 'granted') {
        const assert = await MediaLibrary.createAssetAsync(photo)
        // await MediaLibrary.createAlbumAsync("Images", assert)
      }
    }
    
    const _deletePicture = async (ImgID) => {
      setEditImage(!editImage);
      if(viewImage.length != 0){
        setViewImage([])
        await deleteImageAsset({ variables: { ImgID: ImgID }})
      }else{
        const newArr = [...image];
        newArr.splice(ImgID, 1)
        setImage(newArr)
      }
      refetch2()
    }

    const confirmdeletePicture = (ImgID) =>
    Alert.alert(
      "คุณต้องการรูปภาพนี้ ใช่หรือไม่!",
      "กด ตกลง เพื่อลบรูปภาพ",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        { text: "ตกลง", onPress: () => _deletePicture(ImgID) }
      ]
    );

    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [3, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setFlash(Camera.Constants.FlashMode.off)
        setStartCamera(!startCamera);
        // console.log(result.uri)
        setImage([...image, result.uri]);
        setStatusSave(false)
      }
    };

    const onUpload_Save = async (assetID) => {
      // const file = generateRNFile(image, `picture-${Date.now()}.jpg`);
      await image.map(img => {
        const file = new ReactNativeFile({
          uri: img,
          name: 'name.jpg',
          type: 'image/jpeg'
        });
        // console.log(data.getSearch[0].ASSET_ID)
        uploadImage({ variables: { file: file, assetID: assetID } })
        setImage([])
      })
      updateStatusAsset({ variables: { assetID: assetID, assetStatus: selectedStatusAsset } })
      setStatusSave(true)
      refetch2()
    }

    const confirmUpload_Save = () =>
    Alert.alert(
      "คุณต้องการบันทึก ใช่หรือไม่!",
      "กด ตกลง เพื่อบันทึกข้อมูล",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        { text: "ตกลง", onPress: () => onUpload_Save(data2 && data2.getSearch[0].ASSET_ID) }
      ]
    );

    // Button back list
    useEffect(() => {
      const confirmLeave = () => {
        if(!statusSave){
          Alert.alert(
            "ออกจากการตรวจนับ ใช่หรือไม่!",
            "มีการเปลี่ยนแปลงที่ไม่ได้รับการบันทึก",
            [
              {
                text: "ยกเลิก",
                style: "cancel"
              },
              { text: "ตกลง", onPress: () => navigation.goBack()}
            ]
          );
        }else{
          navigation.goBack()
        }
      }
      navigation.setOptions({
        headerLeft: () => (
            <Button onPress={() => confirmLeave()} color="#164f88" title=" ย้อนกลับ "/>
        ),
        headerRight: () => (
          <Button onPress={() => refetch2()} color="#333333" title="Reload" />
        ),
      });
    }, [navigation, statusSave]);
    
    if (loading1 && loading2) return (
      <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>)
    else return (
    <SafeAreaView  style={styleDashboard.container}>
                <View style={styleDashboard.section}>
          <Text style={styleDashboard.sectionHeader}>ข้อมูลครุภัณฑ์</Text>
          <ScrollView style={styleDashboard.sclDetail}>
            <View style={styleDashboard.gallery}>
                <View style={styleDashboard.detailPackage}>
                  <Text style={styleDashboard.txtDetail}>หมายเลขครุภัณฑ์ : <Text style={{ fontWeight:'bold' }}>{data2 && data2.getSearch[0].ASSET_CODE}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ชื่อ : <Text style={{ fontWeight:'bold' }}>{data2 && data2.getSearch[0].ASSET_NAME}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>สถานะ : <Text style={{ fontWeight:'bold' }}>{data2 && data2.getSearch[0].ASSET_STATUS ? data2 && data2.getSearch[0].ASSET_STATUS[0].STATUS_NAME : ''}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ปริมาณ : {data2 && data2.getSearch[0].ASSET_NUMBER}</Text>
                  <Text style={styleDashboard.txtDetail}>ต้นทุนต่อหน่วย : {data2 && data2.getSearch[0].ASSET_PRICE}</Text>
                  <Text style={styleDashboard.txtDetail}>ยี่ห้อ : {data2 && data2.getSearch[0].ASSET_BRAND}</Text>
                  <Text style={styleDashboard.txtDetail}>โมเดล : {data2 && data2.getSearch[0].ASSET_MODEL}</Text>
                  <Text style={styleDashboard.txtDetail}>หมายเลขเครื่อง : {data2 && data2.getSearch[0].ASSET_SERIALNUMBER}</Text>
                  <Text style={styleDashboard.txtDetail}>ผู้รับผิดชอบ : {data2 && data2.getSearch[0].ASSET_USER ? data2 && data2.getSearch[0].ASSET_USER[0].USER_FIRSTNAME : ''} {data2 && data2.getSearch[0].ASSET_USER ? data2 && data2.getSearch[0].ASSET_USER[0].USER_LASTNAME : ''}</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่ใช้งาน : {data2 && data2.getSearch[0].ASSET_ROOM ? data2 && data2.getSearch[0].ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่เดิม : {data2 && data2.getSearch[0].ASSET_ORIGINAL_ROOM ? data2 && data2.getSearch[0].ASSET_ORIGINAL_ROOM[0].ROOM_NAME : ''}</Text>
                </View>
            </View>
          </ScrollView>
        </View>

        <View style={{...styleDashboard.platformContainer, flex: 0.4,}}>
          <Text style={styleDashboard.txtTitle}>สถาณะครุภัณฑ์</Text>
          <View style={styleDashboard.container}>
              {/* {onStatusAsset()} */}
              {/* {data.getUser.ASSET_PRIVILEGE.map((data,key) => (console.log(data.STATUS_NAME)))} */}
              {/* <Text style={styleDashboard.text}>Selected Value: {data.getSearch[0].ASSET_STATUS ? data.getSearch[0].ASSET_STATUS[0].STATUS_NAME : ''}</Text> */}
              {/* <RNPickerSelect
                  onValueChange={(language) => setLanguage(language)}
                  items={[
                      { label: "JavaScript", value: "JavaScript" },
                      { label: "TypeStript", value: "TypeStript" },
                      { label: "Python", value: "Python" },
                      { label: "Java", value: "Java" },
                      { label: "C++", value: "C++" },
                      { label: "C", value: "C" },
                  ]}
              /> */}
            <Picker
              selectedValue={selectedStatusAsset}
              onValueChange={(itemValue, itemIndex) =>{
                setSelectedStatusAsset(itemValue)
                setStatusSave(false)
              }}>
                {data1 && data1.getUser.ASSET_PRIVILEGE.map((item,i) => (
                  <Picker.Item key={i} label={item.STATUS_NAME} value={item.STATUS_ID} />
                ))}
              
              {/* <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>

        </View>

        
        <View style={{...styleDashboard.platformContainer, flex: 0.4,}}>
            <Text style={styleDashboard.txtTitle}>รูปภาพครุภัณฑ์</Text>
            <View style={styleDashboard.startCameraView}>
              <TouchableOpacity style={{...styleDashboard.startCamera, backgroundColor: data2 && data2.getSearch[0].ASSET_COUNT_IMAGES + image.length >= 5?'#7b9ba5':'#14274e'}} onPress={__startCamera} disabled={data2 && data2.getSearch[0].ASSET_COUNT_IMAGES + image.length >= 5} >
                <Text style={styleDashboard.startCameraText}>
                  Take picture
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:15,color:'#404040'}}>   จำนวนรูปภาพ [{data2 && data2.getSearch[0].ASSET_COUNT_IMAGES}/5]</Text>
          </View>
          <ScrollView style={styleDashboard.sclDetail}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data2 && data2.getSearch[0].ASSET_IMAGES.map((img, i) => (
                <TouchableOpacity key={i} onPress= {()=>{setEditImage(!editImage), setViewImage([img.IMAGE_ID, img.IMAGE])}}>
                  <Image source={{ uri: `data:image/jpeg;base64,${img.IMAGE}` }} style={{width: 100, height: 100, margin: 2,}} />
                </TouchableOpacity>
              ))}
              {image.map((img, i) => (
                <TouchableOpacity key={i} onPress= {()=>{setEditImage(!editImage), setViewImageEx([i, img])}}>
                  <Image source={{ uri: img }} style={{width: 100, height: 100, margin: 2,}} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{fontSize: data2 && data2.getSearch[0].ASSET_COUNT_IMAGES == 0 ? 20 : 0, color: '#606060'}}>{data2 && data2.getSearch[0].ASSET_COUNT_IMAGES == 0 ? 'ไม่มีรูปภาพ' : ''}</Text>
          </ScrollView>

      <TouchableOpacity onPress= {()=>confirmUpload_Save()} disabled={statusSave} style={{...styleDashboard.btnSave, backgroundColor:statusSave?'#7b9ba5':'#4b9cb3'}}>
        <Text style={{ fontSize: 20, color: '#fff' }}>
          <Ionicons name={'save-outline'} size={18} color={'rgba(255,255,255,0.7)'} style={{...styleDashboard.inputIcon }}/>
          <Text> ยืนยันการตรวจนับ</Text>
        </Text>
      </TouchableOpacity>
      {/* Modal Camera */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={startCamera}
          onRequestClose={() => {
            setFlash(Camera.Constants.FlashMode.off)
            setStartCamera(!startCamera);
          }}>
          <View style={styleDashboard.centeredView}>
            <View style={styleDashboard.modalView}>
              {/* <Text style={styleDashboard.modalText}>Hello World!</Text> */}
              <View style={styleDashboard.containerCamera}>
                <Camera ref={cam} flashMode={flash} style={styleDashboard.camera} type={type}>
                  <View style={styleDashboard.headerContainer}>
                    <TouchableOpacity
                      style={{ ...styleDashboard.openButton}}
                      onPress={() => {
                        setFlash(Camera.Constants.FlashMode.off)
                        setStartCamera(!startCamera);
                      }}>
                      <Text style={styleDashboard.textStyle} size={20}>
                        <Ionicons name={'close-outline'} size={40} color={'rgba(255,255,255,1)'} style={styleDashboard.inputIcon} />  
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Option Camera */}
                  <View style={styleDashboard.optionContainer}>
                    <TouchableOpacity 
                      style={styleDashboard.buttonOption}
                      onPress={() => {
                        setFlash(
                          flash === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.torch
                            : Camera.Constants.FlashMode.off
                        );
                      }}>
                      <Text style={styleDashboard.text}> 
                        { flash === Camera.Constants.FlashMode.off 
                          ? <Ionicons name={'flash-off-outline'} size={30} color={'rgba(255,255,255,0.7)'} style={styleDashboard.inputIcon} />
                          : <Ionicons name={'flash-outline'} size={30} color={'rgba(255,255,255,1)'} style={styleDashboard.inputIcon} />
                        }
                       </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={{...styleDashboard.buttonOption, height: 60, width: 60}}
                      onPress={() => _takePicture()}>
                      <Text style={styleDashboard.text}> 
                        <Ionicons name={'camera-outline'} size={40} color={'rgba(255,255,255,1)'} style={styleDashboard.inputIcon} />
                       </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styleDashboard.buttonOption}
                      onPress={pickImage}>
                      <Text style={styleDashboard.text}> 
                        <Ionicons name={'image-outline'} size={30} color={'rgba(255,255,255,0.7)'} style={styleDashboard.inputIcon} />
                       </Text>
                    </TouchableOpacity>
                  </View>
                  {/* End option camera */}
                  
                </Camera>
              </View>
            </View>
          </View>
        </Modal>
      {/* End modal Camera */}
      {/* Modal edit image */}
      <Modal
        animationType="none"
        transparent={true}
        visible={editImage}
        onRequestClose={() => {
          setViewImage([])
          setViewImageEx([])
          setEditImage(!editImage);
        }}>
          <View style={styleDashboard.centeredView}>
            <View style={styleDashboard.modalView}>
              <View style={styleDashboard.containerCamera}>
                <View style={{...styleDashboard.camera, backgroundColor: 'rgba(0,0,0,0.85)'}}>
                  <View style={styleDashboard.headerContainer}>
                    <TouchableOpacity
                      style={{ ...styleDashboard.openButton}}
                      onPress={() => {
                        setViewImage([])
                        setViewImageEx([])
                        setEditImage(!editImage);
                      }}>
                      <Text style={styleDashboard.textStyle} size={20}>
                        <Ionicons name={'close-outline'} size={40} color={'rgba(255,255,255,1)'} style={styleDashboard.inputIcon} />  
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Image source={{ uri: viewImage.length != 0 ? `data:image/jpeg;base64,${viewImage[1]}` : viewImageEx[1] }} style={{ width: WIDTH - 16, height: WIDTH- 16,margin:8}} />
                  <View style={styleDashboard.optionContainer}>
                    {/* <TouchableOpacity 
                      style={styleDashboard.buttonOption}
                      onPress={() => {}}>
                      <Text style={styleDashboard.text}> 
                        <Ionicons name={'arrow-back-outline'} size={30} color={'rgba(255,255,255,0.7)'} style={styleDashboard.inputIcon} />
                       </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity ></TouchableOpacity>
                    <TouchableOpacity 
                      style={{...styleDashboard.buttonOption, height: 60, width: 60, backgroundColor: '#ff000080'}}
                      onPress={() => confirmdeletePicture(viewImage.length != 0 ? viewImage[0] : viewImageEx[0])}>
                      <Text style={styleDashboard.text}> 
                        <Ionicons name={'trash-outline'} size={40} color={'rgba(255,255,255,1)'} style={{...styleDashboard.inputIcon}} />
                       </Text>
                    </TouchableOpacity>
                    <TouchableOpacity ></TouchableOpacity>
                    {/* <TouchableOpacity 
                      style={styleDashboard.buttonOption}
                      onPress={pickImage}>
                      <Text style={styleDashboard.text}> 
                        <Ionicons name={'arrow-forward-outline'} size={30} color={'rgba(255,255,255,0.7)'} style={styleDashboard.inputIcon} />
                       </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
      </Modal>
      {/* End modal edit image */}
      
    </SafeAreaView>
    
    );
}

// *************** End Main Function ***************
export default Dashboard 