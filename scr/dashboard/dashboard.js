import React, { useState, useEffect} from 'react';
import { 
  Dimensions,
  SafeAreaView, 
  Text, 
  View,
  Button,
  TouchableOpacity,
  styleDashboardheet,
  ScrollView,
  Platform,
  FlatList,
  Switch,
  TouchableWithoutFeedback,
  Picker,
  ImageBackground,
  Alert,
  Modal,
  Image
 } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons  } from '@expo/vector-icons';

import styleDashboard from '../style/styleDashboard'

const Dashboard = ({ navigation }) => {
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [choosenLabel, setChoosenLabel] = useState('ใช้งาน');
    const [startCamera, setStartCamera] = useState(false)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);


    const __startCamera = async () => {
      const {status} = await Camera.requestPermissionsAsync()
      console.log(status)
      if (status === 'granted') {
        setStartCamera(true)
      } else {
        Alert.alert('Access denied')
      }
    }

    // Button back list
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.navigate("Scanner")} color="#164f88" title=" สแกน "/>
        ),
      });
    }, [navigation]);

    // Button back sanner
    function onBackPressed(){
      navigation.navigate("Scanner");
    }


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

    return (
    <SafeAreaView  style={styleDashboard.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styleDashboard.centeredView}>
            <View style={styleDashboard.modalView}>
              {/* <Text style={styleDashboard.modalText}>Hello World!</Text> */}
              <View style={styleDashboard.containerCamera}>
                <Camera style={styleDashboard.camera} type={type}>
                  <View style={styleDashboard.buttonContainer}>
                    <TouchableOpacity
                      style={styleDashboard.button}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}>
                      <Text style={styleDashboard.text}> Flip </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>

              <TouchableOpacity
                style={{ ...styleDashboard.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styleDashboard.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styleDashboard.section}>
          <Text style={styleDashboard.sectionHeader}>ข้อมูลครุภัณฑ์</Text>
          <ScrollView style={styleDashboard.sclDetail}>
            <View style={styleDashboard.gallery}>
                <View style={styleDashboard.detailPackage}>
                  <Text style={styleDashboard.txtDetail}>หมายเลขครุภัณฑ์ : <Text style={{ fontWeight:'bold' }}>{/*route.params.data*/}</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ชื่อ : <Text style={{ fontWeight:'bold' }}>โต๊ะคอมพิวเตอร์</Text></Text>
                  <Text style={styleDashboard.txtDetail}>ปริมาณ : 1 ตัว</Text>
                  <Text style={styleDashboard.txtDetail}>ต้นทุนต่อหน่วย : 3350.00</Text>
                  <Text style={styleDashboard.txtDetail}>ยี่ห้อ : -</Text>
                  <Text style={styleDashboard.txtDetail}>โมเดล : -</Text>
                  <Text style={styleDashboard.txtDetail}>หมายเลขเครื่อง : -</Text>
                  <Text style={styleDashboard.txtDetail}>สถานะ : ชำรุด</Text>
                  <Text style={styleDashboard.txtDetail}>ผู้รับผิดชอบ : ว่าที่ ร.ต.ญ. หนึ่งฤทัย เตชะ</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่ใช้งาน : ICT1303</Text>
                  <Text style={styleDashboard.txtDetail}>สถานที่เดิม : ICT1303</Text>
                </View>
            </View>
          </ScrollView>
        </View>

        <ScrollView style={styleDashboard.sclDetail}>
          <View style={styleDashboard.platformContainer}>
            <Text style={styleDashboard.txtTitle}>ผลการตรวจสอบครุภัณฑ์</Text>
            <View style={styleDashboard.container}>
                {onStatusAsset()}
                {/* {data.getUser.ASSET_PRIVILEGE.map((data,key) => (console.log(data.STATUS_NAME)))} */}
                {/* <Text style={styleDashboard.text}>Selected Value: {choosenLabel}</Text> */}
            </View>

          </View>
          <View style={styleDashboard.platformContainer}>
            <Text style={styleDashboard.txtTitle}>รูปภาพครุภัณฑ์</Text>
            <View style={styleDashboard.startCameraView}>
              <TouchableOpacity style={styleDashboard.startCamera} onPress={__startCamera}>
                <Text style={styleDashboard.startCameraText}>
                  Take picture
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleDashboard.openButton}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styleDashboard.textStyle}>Show Modal</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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

      <TouchableOpacity onPress= {()=>onBackPressed()} style={styleDashboard.btnScaner}>
        <Text style={{ fontSize: 20, color: '#fff' }}>
          <Ionicons name={'scan'} size={18} color={'rgba(255,255,255,0.7)'} style={styleDashboard.inputIcon} />
          Tap to Scan Again
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    
    );
}
// *************** End Main Function ***************
export default Dashboard 