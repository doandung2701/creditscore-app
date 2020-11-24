import React, { Component } from 'react';
import Search from './Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

class CreditApp extends Component {
  render() {
    return (
       <Search/>
    );
  }
}
<Entypo name="news" size={24} color="black" />

export default CreditApp;