import React, { Component } from 'react';
import { VictoryPie } from 'victory-native';
import { StyleSheet, Text, View, Image } from 'react-native';

class Profile extends Component {

  render() {

    const graphicData = [
      { y: 10, x: '5%' },
      { y: 90, x: '90%' },
      { y: 50, x: '50%' },
      { y: 20, x: '20%' },
      { y: 70, x: '70%' },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.avatarStyle}>
          <View style={styles.avatarWrraper}>
            <Image
              style={styles.avatar}
              resizeMode='contain'
              // source={require('../../assets/login.png')}
            />
          </View>
          <View style={styles.userInfo}>
            <Text>Welcome</Text>
          </View>
        </View>
        <View style={styles.chartStyle}>
          <VictoryPie
            startAngle={90}
            endAngle={-90}
            data={graphicData}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarStyle: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chartStyle: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrraper: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 0.6,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})

export default Profile;