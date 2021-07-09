import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGTH } = Dimensions.get('window')

const styleAssetChecked=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 16,
      },
      sclMenu:{
        // flex:2,
        flex: 2,
        backgroundColor: '#EEEEEE',
        // paddingVertical: 5,
        paddingHorizontal: 20
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 1,
        color: '#A7A7A7'
      },
      gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      section: {
        flexDirection: 'column',
        paddingTop: 10
      },
      btnMenu:{
        // alignItems: 'center', 
        // justifyContent: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        borderRadius: 3,
        borderBottomRightRadius: 10,
        backgroundColor: '#c4f3c8',
        marginTop:10,
        height:80,
        width: WIDTH,
        borderBottomWidth:1,
        borderBottomColor:'#23b32f',
        borderLeftWidth:2,
        borderLeftColor:'#115517',
        // whileSpace:'nowrap'
      },
      btnText:{
        fontSize: 18, 
        color: '#455054', 
      },
      inputIcon:{
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignItems: 'flex-end'
        // paddingRight: 10,
        fontSize: 35, 
        // textAlign:'center',
        width: 40,
      },
      inputNumberPackage:{
        width: WIDTH-10,
        height: 50,
        // borderRadius: 20,
        borderColor:'#00000060',
        borderBottomWidth:2,
        borderRadius:10,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'rgba(0,0,0,0.7)',
    
        // marginHorizontal: 25,
        marginTop:5,
        marginBottom:5,
        left:5,
      },
      inputIconNumberPackage:{
        position: 'absolute',
        top:15,
        left:10,
      },
      // Modal
      closdBtn:{
        zIndex:1,
        backgroundColor: '#00000080',
        position: 'absolute', 
        paddingLeft:2.5,
        right:4,
        top:10,
        margin:0,
        borderRadius:5,
        textAlign: 'center',
        alignItems: 'center',
      },
      centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        width: WIDTH,
        height: HEIGTH,
      },
      detailDataModal: {
        width: WIDTH,
        height: HEIGTH,
        backgroundColor: '#00000010',
        padding:10
      },
      txtDetail: {
        fontSize:20,
        paddingLeft: 10,
      },
      txtTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        borderBottomWidth: 1,
        marginBottom: 2,
        paddingBottom: 10,
      },
      btnToDashboard: {
        marginBottom:10,
        marginTop:10,
        height:50,
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft:10,
        width: WIDTH - 20,
        position: 'absolute',
        bottom: 20,
      }
})

export default styleAssetChecked