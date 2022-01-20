import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, BackHandler, Alert,Linking } from "react-native";
import { WebView } from 'react-native-webview';


const WebViewExample = () => {

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      }
    }
  }, []); // INITIALIZE ONLY ONCE

  const HandleBackPressed = () => {
    if (webView.current) {
      if(canGoBack){
        webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
      } else {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
      }return true;
    } 
}

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      HandleBackPressed
    );

  return(
    <WebView 
    style={styles.container} 
    ref={webView}
    source={{ uri: 'https://www.venuebook.online/' }} 
    onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
    javaScriptEnabled={true}
    setSupportMultipleWindows={true}
    onShouldStartLoadWithRequest={request => {if (!request || !request.url) {
      return true;
    }
  
    // list of schemas we will allow the webview
    // to open natively
    if(request.url.match('phone'))
    {
      Linking.openURL(request.url).catch(er => {
        console.log('Failed to open Link:', er.message);
      });
      return false;
    }
  
    // let everything else to the webview
    return true;}}
    /> 
  );
};
 
const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
});

export default WebViewExample;