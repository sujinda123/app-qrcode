import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')

const styleHome=StyleSheet.create({
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
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomRightRadius: 15,
        margin: 6,
        backgroundColor: '#C9BBC8',
        marginTop:10,
        height:WIDTH/2.2,
        width: WIDTH/2 - 32,
        borderBottomWidth:2,
        borderLeftWidth:3,
        borderBottomColor:'#D45769',
    },
    btnLogout:{
        // alignSelf: 'flex-end',
        backgroundColor: '#EEEEEE',
        marginLeft:10,
        width: WIDTH - 20,
        height:50,
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'absolute',
        bottom:0,
    },
    txtLogout: { 
        fontSize: 20, 
        color: '#fff', 
        fontWeight:'bold',
        marginBottom:10, 
        backgroundColor: '#ae280a',
        width: WIDTH - 20,     
        // height:50,
        textAlign:'center',
        padding: 10,
        borderRadius:5,
    },
    stretch: {
        width: 150,
        height: 100,
        resizeMode: 'stretch',
    },
    iconLogo:{
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userData:{
        margin:5,
        marginBottom:0,
        padding:5,
        paddingBottom:10,
        borderBottomWidth:2,
        borderBottomColor:'#000',
    },
})

export default styleHome