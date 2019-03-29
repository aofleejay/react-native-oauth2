import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ISSUER, CLIENT_ID, REDIRECT_URL } from 'react-native-dotenv'
import { authorize, refresh, revoke } from 'react-native-app-auth'

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  scopes: ['openid', 'profile', 'offline_access']
}

class App extends Component {
  state = { auth: null }

  _authorize = async () => {
    try {
      const authState = await authorize(config)
      this.setState({ auth: authState })
    } catch (error) {
      console.log(error)
    }    
  }

  _refreshToken = async () => {
    try {
      const refreshState = await refresh(config, { refreshToken: this.state.auth.refreshToken })
      this.setState({ auth: refreshState })
    } catch (error) {
      console.log(error)
    }    
  }

  _revokeToken = async () => {
    try {
      await revoke(config, { tokenToRevoke: this.state.auth.accessToken, sendClientId: true })
      this.setState({ auth: null })
    } catch (error) {
      console.log(error)
    }    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(this.state.auth)}</Text>
        <TouchableOpacity onPress={this._authorize}>
          <Text>Authorize</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._refreshToken}>
          <Text>Refresh Token</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._revokeToken}>
          <Text>Revoke Token</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})

export default App
