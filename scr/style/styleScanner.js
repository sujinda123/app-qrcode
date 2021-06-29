import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGTH } = Dimensions.get('window')

const bg = "#EEEEEE"
const styleScanner = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    // height: HEIGTH,
  },
  iconScanner:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"center",
  },
  layerTop: {
    flex: 0.1,
    backgroundColor: bg
  },
  layerCenter: {
    flex: 2,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 2,
    backgroundColor: bg
  },
  focused: {
    flex: 8,
    justifyContent: 'center',
    alignItems:"center",
  },
  layerRight: {
    flex: 2,
    backgroundColor: bg
  },
  layerBottom: {
    flex: 3.5,
    backgroundColor: bg,
    justifyContent: 'center',
    alignItems:"center",
    paddingBottom: 5,
  },
  // Input Number Package
  inputNumberPackage:{
    width: WIDTH - 50,
    height: 40,
    // borderRadius: 20,
    borderColor:'#00000060',
    borderBottomWidth:2,
    borderRightWidth:2,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'rgba(0,0,0,0.7)',

    // marginHorizontal: 25,
    marginTop:5,
    marginBottom:5,
    left:5,
  },
  // Icon Input Number Package
  inputIconNumberPackage:{
    position: 'absolute',
    top:10,
    left:10,
  },
  btnPackage:{
    justifyContent: 'center',
    alignItems:"center",
    position: 'absolute',
    // backgroundColor: '#9a57b4',
    top:3,
    // width:45,
    right: 50,
    // height:45,
    padding:5,
    borderRadius:0,
    borderLeftWidth:2,
    borderLeftColor:'#6a3c7c',
  },
  
  //  --- Title Text
  titleText:{
    color:"#d0eaf6",
    backgroundColor: "#1c77a0",
    fontSize:22,
    paddingLeft:10,
    textAlign:"center",
    padding:5,
    borderColor:"#81c8e9",
    borderBottomWidth:3,
    borderTopColor:"#81c8e9",
    borderTopWidth:3,
    fontWeight: 'bold',
    marginTop:3,
    width: WIDTH,
  },
  
  itemList:{
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#20232a',
    backgroundColor: '#8accea',
    color: '#20232a',
    textAlign: 'center',
    marginTop:3,
    padding:15,
    width: WIDTH - 30,
    borderRadius:5,
    borderLeftColor:"#000",
    borderLeftWidth: 5, 
  },
  nameItemList:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  IDItemList:{
    fontSize: 18,
  },
  // Head Search Modal
  headSearchModal:{
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: HEIGTH,
    width: WIDTH,
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  openButton: {
    borderRadius: 5,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20, 
    color: '#fff', 
    fontWeight:'bold',
    marginTop:8,
    marginBottom:5, 
    backgroundColor: '#616470',
    // width: WIDTH - 20,     
    // height:50,
    textAlign:'center',
  },
  txtOpenModalSearch: {
    fontSize: 16, 
    color: '#fff', 
    fontWeight:'bold',
  },
  closdBtn:{
    backgroundColor: '#00000080',
    position: 'absolute', 
    paddingLeft:2.5,
    right:4,
    top:4,
    margin:0,
    // padding:0,
    borderRadius:5,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styleScanner