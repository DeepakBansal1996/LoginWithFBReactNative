import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  View
} from 'react-native';

import { LoginManager,AccessToken,GraphRequestManager,GraphRequest} from 'react-native-fbsdk';


export default class Example extends Component {

  _fbAuth(){
    var that =this;
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function (result){
      if(result.isCancelled){
        console.log("Login cancelled");
      }
      else{
        console.log("Login AccessToken");

        AccessToken.getCurrentAccessToken().then(
          (data) => {
            let accessToken=data.accessToken;

            const responseInfoCallback = (error, result) => {
              setTimeout(()=>{
                if(error){
                  Alert.alert('Error' + error.toString());
                }
                else {
                  if(result.name == undefined){
                    Alert.alert('Errordd' , JSON.stringify(result,null,2).toString() );
                  }
                  else{
                    Alert.alert('Error' , result.name);
                  }
                }
              },20000)
            }

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken:accessToken,
                parameters:{
                  fields:{
                    string:'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback,
              Alert.alert('Error')

            );

            new GraphRequestManager().addRequest(infoRequest).start();
          })
      }
    }, function (error){
      console.log("some error occured",error);
    })
    
  }
  render(){
    return (
      <View style={styles.container}>
         <View style={styles.logo}>
           <Image
                style={{width : 100, height : 101}} 
                source = {require('./src/images/dp.jpg')}>
            </Image>

           <Text style={styles.logoText}>
             <Text>React-Native With</Text>
             <Text style={{color : 'blue'}}> Deepak</Text>
           </Text>
           <TouchableOpacity 
              onPress={this._fbAuth.bind(this)}
              >
              <Text>FB Login</Text>
           </TouchableOpacity>   
         </View>

      </View>
    );
  }
}

const styles=StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor :'#ccccf1'
  },
  logo :{
    alignItems : 'center',
    flexGrow :1,
    justifyContent : 'center'
  },
  logoText : {
    color : '#3b3631', 
    fontSize : 24,
    fontWeight:'bold'

  }
});

AppRegistry.registerComponent('Example', ()=> Example);