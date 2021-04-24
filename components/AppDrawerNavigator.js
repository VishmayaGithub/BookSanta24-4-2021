import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import  {AppTabNavigator}  from './AppTabNavigator'
import CustomSideBarMenu  from './CustomerSideBarMenu';
import SettingScreen from '../Screens/SettingScreen'
import MyDonationScreen from '../Screens/MyDonations';
import NotificationScreen from '../Screens/NotificationScreen';
import MyReceivedBooksList from '../Screens/MyReceivedBookList'

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyDonations : {
      screen : MyDonationScreen
    },
    Notification : {
      screen : NotificationScreen
    },
    Setting:{
      screen:SettingScreen
    },
    'Books I Recieved':{
      screen:MyReceivedBooksList
    }
  },
  {
    contentComponent: CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })