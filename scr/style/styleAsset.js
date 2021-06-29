import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')

const styleAsset=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 16,
    },
    sclMenu:{
        // flex:2,
        flex: 2,
        backgroundColor: '#EEEEEE',
        paddingVertical: 10,
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
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        borderBottomRightRadius: 10,
        margin: 6,
        backgroundColor: '#C9BBC8',
        marginTop:10,
        height:60,
        width: WIDTH - 50,
        borderBottomWidth:1,
        borderLeftWidth:2,
        borderBottomColor:'#D45769',
        // whileSpace:'nowrap'
    },
    btnText:{
        fontSize: 18, 
        color: '#455054', 
        fontWeight:'bold'
    },
    textCheck:{
        fontSize: 16, 
        textAlign:'center',
        backgroundColor: '#1d772c',
        paddingVertical: 5,
        width: 40,
        color: '#fff',
        borderRadius: 15,
    },
    textNotCheck:{
        fontSize: 16, 
        textAlign:'center',
        backgroundColor: '#c10e01',
        paddingVertical: 5,
        width: 40,
        color: '#fff',
        borderRadius: 15,
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
})

export default styleAsset