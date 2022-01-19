import React, { useEffect,useRef,useState } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { WebView } from 'react-native-webview';

//import App from './BackHandler';

const GoBack=()=>{
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      }
    }
    else{
      <WebViewExample/>
    }
  }, []); // INITIALIZE ONLY ONCE

  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return 
    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  }
  return (
      <WebView ref={webView} source={{ uri: 'https://reactnative.dev/' }} />
  );
}

export default GoBack;