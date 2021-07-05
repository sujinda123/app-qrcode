import React, { useState, useEffect, useRef} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image
 } from 'react-native';
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
import { QUERY_SEARCH_ASSET } from '../GQL/query'

const Dashboard = ({ navigation }) => {
    const route = useRoute();
    const [numberPackage] = useState(route.params.data.ASSET_CODE)
    const [uploadImage] = useMutation(MUTATION_IMAGE_UPLOAD);
    const { loading, error, data, refetch } = useQuery(QUERY_SEARCH_ASSET, {
      variables: { ASSET_CODE: numberPackage },
    });

    const [choosenLabel, setChoosenLabel] = useState('ใช้งาน');
    const [startCamera, setStartCamera] = useState(false)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    const [image, setImage] = useState([]);
    const [statusSave, setStatusSave] = useState(true);
    const cam = useRef(null)

    // Set Images
    // data.getSearch[0].ASSET_IMAGES.map(img => setImage([...image, img]))


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
        console.log(source)
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

    const onUpload_Save = async () => {
      // const file = generateRNFile(image, `picture-${Date.now()}.jpg`);
      await image.map(img => {
        const file = new ReactNativeFile({
          uri: img,
          name: 'name.jpg',
          type: 'image/jpeg'
        });
        // console.log(data.getSearch[0].ASSET_ID)
        uploadImage({ variables: { file: file, assetID: data.getSearch[0].ASSET_ID  } })
        setImage([])
      })
      setStatusSave(true)
      refetch()
    }

    const confirmUpload_Save = () =>
    Alert.alert(
      "คุณต้องการบันทึก ใช่หรือไม่!",
      "กด ตกลง เพื่อบันทึกข้อมูล",
      [
        {
          text: "ยกเลิก",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "ตกลง", onPress: () => onUpload_Save() }
      ]
    );

    // Button back list
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.navigate("Scanner")} color="#164f88" title=" สแกน "/>
        ),
      });
    }, [navigation]);

    // Button back sanner
    // function onBackPressed(){
    //   navigation.navigate("Scanner");
    // }


    function onStatusAsset() {
    // const { data, error, loading } = useQuery(QUERY_STATUS);
    //   if (loading) return <Text>Loading...</Text>;
    //   // if (error) return `Error! ${error.message}`;
    //   // if(data.search!=null)
    //     // console.log(data.getSearch)
    //   //   var result = data.search.map(person => ({ value: person.id, text: person.assetNumber }));
    //   //   console.log(result)
    //   return (
    //     <Picker
    //             selectedValue={choosenLabel}
    //             onValueChange={(itemValue) => {
    //               setChoosenLabel(itemValue);
    //             }}>
    //       {data.getUser.ASSET_PRIVILEGE.map((data,key) => (<Picker.Item key={key} label={data.STATUS_NAME} value={data.STATUS_NAME} />))}
    //     </Picker>
    //   );
    }
    if (loading) return <Text>Loading...</Text>;
    else return (
    <SafeAreaView  style={styleDashboard.container}>
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

        <View style={styleDashboard.section}>
          <Text style={styleDashboard.sectionHeader}>ข้อมูลครุภัณฑ์</Text>
          <ScrollView style={styleDashboard.sclDetail}>
            <View style={styleDashboard.gallery}>
                <View style={styleDashboard.detailPackage}>
                  <Text style={styleDashboard.txtDetail}>หมายเลขครุภัณฑ์ : <Text style={{ fontWeight:'bold' }}>{data.getSearch[0].ASSET_CODE}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ชื่อ : <Text style={{ fontWeight:'bold' }}>{data.getSearch[0].ASSET_NAME}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ปริมาณ : {data.getSearch[0].ASSET_NUMBER}</Text>
                  <Text style={styleDashboard.txtDetail}>ต้นทุนต่อหน่วย : {data.getSearch[0].ASSET_PRICE}</Text>
                  <Text style={styleDashboard.txtDetail}>ยี่ห้อ : {data.getSearch[0].ASSET_BRAND}</Text>
                  <Text style={styleDashboard.txtDetail}>โมเดล : {data.getSearch[0].ASSET_MODEL}</Text>
                  <Text style={styleDashboard.txtDetail}>หมายเลขเครื่อง : {data.getSearch[0].ASSET_SERIALNUMBER}</Text>
                  <Text style={styleDashboard.txtDetail}>สถานะ : {data.getSearch[0].ASSET_STATUS ? data.getSearch[0].ASSET_STATUS[0].STATUS_NAME : ''}</Text>
                  <Text style={styleDashboard.txtDetail}>ผู้รับผิดชอบ : {data.getSearch[0].ASSET_USER ? data.getSearch[0].ASSET_USER[0].USER_FIRSTNAME : ''} {data.getSearch[0].ASSET_USER ? data.getSearch[0].ASSET_USER[0].USER_LASTNAME : ''}</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่ใช้งาน : {data.getSearch[0].ASSET_ROOM ? data.getSearch[0].ASSET_ROOM[0].ROOM_NAME : ''}</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่เดิม : {data.getSearch[0].ASSET_ORIGINAL_ROOM ? data.getSearch[0].ASSET_ORIGINAL_ROOM[0].ROOM_NAME : ''}</Text>
                </View>
            </View>
          </ScrollView>
        </View>

        <View style={{...styleDashboard.platformContainer, flex: 0.4,}}>
          <Text style={styleDashboard.txtTitle}>สถาณะครุภัณฑ์</Text>
          <View style={styleDashboard.container}>
              {onStatusAsset()}
              {/* {data.getUser.ASSET_PRIVILEGE.map((data,key) => (console.log(data.STATUS_NAME)))} */}
              <Text style={styleDashboard.text}>Selected Value: {data.getSearch[0].ASSET_STATUS ? data.getSearch[0].ASSET_STATUS[0].STATUS_NAME : ''}</Text>
          </View>

        </View>

        
        <View style={{...styleDashboard.platformContainer, flex: 0.4,}}>
            <Text style={styleDashboard.txtTitle}>รูปภาพครุภัณฑ์</Text>
            <View style={styleDashboard.startCameraView}>
              <TouchableOpacity style={styleDashboard.startCamera} onPress={__startCamera}>
                <Text style={styleDashboard.startCameraText}>
                  Take picture
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:15,color:'#404040'}}>   จำนวนรูปภาพ [5/5]</Text>
          </View>
          <ScrollView style={styleDashboard.sclDetail}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data.getSearch[0].ASSET_IMAGES.map((img, i) => (
                <Image key={i} source={{ uri: `data:image/jpeg;base64,${img.IMAGE}` }} style={{width: 100, height: 100, margin: 2,}} />
              ))}
              {image.map((img, i) => (
                <Image key={i} source={{ uri: img }} style={{width: 100, height: 100, margin: 2,}} />
              ))}
            </View>


        {/* {Platform.OS === 'android' && (
          <View style={styleDashboard.platformContainer}>
            <Text style={styleDashboard.platformContainerTitle}>Android only properties</Text>
            <CustomPicker
              label="Text Vertical Align"
              data={textAlignmentsVertical}
              currentIndex={textVerticalAlignIdx}
              onSelected={setTextVerticalAlignIdx}
            />
            <CustomSwitch
              label="Include Font Padding"
              handleValueChange={setIncludeFontPadding}
              value={includeFontPadding}
            />
          </View>
        )}
        {Platform.OS === 'ios' && (
          <View style={styleDashboard.platformContainer}>
            <Text style={styleDashboard.platformContainerTitle}>iOS only properties</Text>
            <CustomPicker
              label="Text Decoration Style"
              data={textDecorationstyleDashboard}
              currentIndex={textDecorationStyleIdx}
              onSelected={setTextDecorationStyleIdx}
            />
            <CustomPicker
              label="Writing Direction"
              data={writingDirections}
              currentIndex={writingDirectionIdx}
              onSelected={setWritingDirectionIdx}
            />  
          </View>
        )} */}
        
      </ScrollView>

      <TouchableOpacity onPress= {()=>confirmUpload_Save()} disabled={statusSave} style={{...styleDashboard.btnSave, backgroundColor:statusSave?'#7b9ba5':'#4b9cb3'}}>
        <Text style={{ fontSize: 20, color: '#fff' }}>
          <Ionicons name={'save-outline'} size={18} color={'rgba(255,255,255,0.7)'} style={{...styleDashboard.inputIcon }}/>
          <Text> Save</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    
    );
}
// *************** End Main Function ***************
export default Dashboard 