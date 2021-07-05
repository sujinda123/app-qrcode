import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')

const styleDashboard=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 1,
        color: '#A7A7A7',
        paddingVertical: 10,
      },
      section:{
        flex: 1, 
      },
      txtTitle:{
        fontSize: 20,
        fontWeight: 'bold',
      },
      gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
      },
      detailPackage:{
       flex: 1, 
       marginHorizontal: 5,
      },
      txtDetail:{
        fontSize:16,
      },
      btnSave:{
        marginBottom:10,
        marginTop:10,
        height:50,
        alignItems: 'center', 
        justifyContent: 'center'
      },
      inputIcon:{
        justifyContent: 'center',
        alignItems: 'center', 
      },
      // ------------ 
      paragraph: {
        color: 'black',
        textDecorationColor: 'yellow',
        textShadowColor: 'red',
        textShadowRadius: 1,
        margin: 24,
      },
      wrapperHorizontal: {
        // height: 54,
        justifyContent: 'center',
        color: 'black',
        marginBottom: 12,
      },
      itemStyleHorizontal: {
        marginRight: 10,
        height: 45,
        // padding: 5,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
      },
      itemSelectedStyleHorizontal: {
        borderWidth: 2,
        borderColor: '#DAA520',
      },
      sclDetail:{
        flex: 2,
        backgroundColor: '#EEEEEE',
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      sclDetailCheck:{
        backgroundColor: '#EEEEEE',
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      platformContainer: {
        marginTop: 8,
        borderTopWidth: 1,
      },
      platformContainerTitle: {
        marginTop: 8,
      },
      title: {
        fontWeight: 'bold',
        marginVertical: 4,
        fontSize: 18,
        marginBottom: 5,
      },
      //Camera
      containerCamera: {
        flex: 1,
      },
      camera: {
        width:WIDTH,
        flex: 1,
      },
      headerContainer: {
        alignItems: 'flex-end',
        margin: 10,
      },
      optionContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between',

      },
      buttonOption: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#de5fec70',
        width: 50,
        height: 50,
        borderRadius: 30,
      },
      text: {
        fontSize: 18,
        color: 'black',
      },
      //startCamera
      startCamera:{
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
      },
      startCameraText:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      startCameraView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
      },
      //Modal
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
      },
      openButton: {
        backgroundColor: '#00000070',
        // borderRadius: 20,  
        borderRadius: 25,
        width: 40,
        height: 40,
        // elevation: 2,
        justifyContent:'center'
      },
      modalView: {
        // margin: 20,
        // backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      albumImages: {
        width: 100,
        height: 100,
        flex: 1,
        flexDirection: 'row',
      },
})

export default styleDashboard