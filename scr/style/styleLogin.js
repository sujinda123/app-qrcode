import { StyleSheet, Dimensions } from 'react-native';
const { width : WIDTH,height : HEIGHT } = Dimensions.get('window')

const styleLogin=StyleSheet.create({
    backgroundContainer: {
        flex:1,
        width:null,
        height:null,
        justifyContent:"center",
        alignItems:"center",
    },
    logoContainer:{
        alignItems:"center",
    },
    logo:{
        width:300,
        height:100,
        resizeMode: 'cover',
        opacity:0.8
    },
    logoText:{
        color:'white',
        fontSize:20,
        fontWeight:'700',
        marginTop:20,
        opacity:0.5
    },
    // Input Username And Password
    inputContainer:{
        marginTop:10
    },
      input:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon:{
        position: 'absolute',
        top:8,
        left:37,
    },
    // Eye
    btnEye:{
        position: 'absolute',
        top:8,
        right:37,
    },
    // Btn Login
    btnLogin:{
        width: WIDTH - 55,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 30,
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        textAlign:'center',
        fontWeight:'700',
      },
    // msg error
    errorText:{
        marginTop:20,
        width: WIDTH - 55,
        color: '#842029',
        backgroundColor: '#f8d7da',
        borderColor: '#f5c2c7',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        textAlign:'center',
        fontSize: 16,
    }
})

export default styleLogin