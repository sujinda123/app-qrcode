import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')

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
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        borderBottomRightRadius: 10,
        margin: 6,
        backgroundColor: '#c4f3c8',
        marginTop:10,
        height:60,
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
        fontWeight:'bold'
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
})

export default styleAssetChecked