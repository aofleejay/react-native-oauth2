import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import SafariView from "react-native-safari-view"
import { AUTHORIZATION_URL, CLIENT_ID, REDIRECT_URL } from 'react-native-dotenv'

class App extends Component {
  _openBrowser = (url) => {
    SafariView.isAvailable()
      .then(SafariView.show({ url }))
      .catch(error => { console.error(error) })
  }

  _openAuthorizePage = () => {
    this._openBrowser(`${AUTHORIZATION_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openAuthorizePage}>
          <Text>Authorize</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
