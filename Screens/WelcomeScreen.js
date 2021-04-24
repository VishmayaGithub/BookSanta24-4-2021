import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View ,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';

import db from '../config'
import firebase from  'firebase'



export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId:'',
            password:'',
            isModalVisible:false,
            firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      
        }
    }

    userSignup= (emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("password doesnt match check ur passowrd")
        }else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
  .then(() => {
    db.collection('User').add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        mobile_number:this.state.contact,
        email_id:this.state.emailId,
        address:this.state.address,
        IsBookRequestActive:false
   
    
    
  })
  return Alert.alert("user added successfully", '',
  [
    {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
  ])
})
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage)
    
  });
    }
}

    userLogin = (emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(() => {
           this.props.navigation.navigate('DonateBooks')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });




    }


    showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                placeholderTextColor="white"
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                placeholderTextColor="white"
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholderTextColor="white"
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholderTextColor="white"
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholderTextColor="white"
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                
                placeholderTextColor="white"
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confirm Password"}
                placeholderTextColor="white"
                secureTextEntry = {true}
                placeholderTextColor="white"
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignup(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
render(){
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

</View>
  {
    this.showModal()
  }
        
        <View style={styles.profileContainer}>
          
            <Text style = {styles.title}> Book Santa App</Text>
        </View>
  <View>      
<TextInput style={styles.loginBox} placeholder="Email Id"placeholderTextColor="white"
keyboardType = "email-address"
onChangeText = {(text)=>{
    this .setState({
        emailId:text
    })
}}
/>


<TextInput style={styles.loginBox} placeholder="Password"
placeholderTextColor="white"

secureTextEntry = {true}
onChangeText = {(text)=>{
    this .setState({
        password:text
    })
}}
/>

<TouchableOpacity style ={[styles.button,{marginBottom:20, marginTop:20}]}
onPress={()=>this.setState({ isModalVisible:true})}
>
    <Text>Signup</Text>

</TouchableOpacity>


<TouchableOpacity  style ={[styles.button,{marginBottom:20, marginTop:20}]}
onPress= {()=>{this.userLogin(this.state.emailId,this.state.password)}}>
    <Text>Login</Text>

</TouchableOpacity>

</View>
</View>

        
    )
}





}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#222629',
      alignItems: 'center',
      justifyContent: 'center',
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : 'white'  
   },
   loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 2.5,
    borderColor: '#61892F',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
   },
   KeyboardAvoidingView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'white',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#61892F',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
   

    color: 'white',
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'white',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#86C232',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
   },
   buttonText:{
     color:"white",
     fontWeight:'200',
     fontSize:20
   }
  })