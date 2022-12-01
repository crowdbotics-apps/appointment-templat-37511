import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../ServiceProviderView/profileScreen"
import MyCalender from "../ServiceProviderView/myCalenderScreen"
import Notifications from '../ServiceProviderView/serviceProviderNotificationsScreen';
import Messages from '../ServiceProviderView/serviceProviderMessagesScreen';
function ServiceProviderNavigator() {
  const ServiceProviderStack = createStackNavigator()
  return (
    <ServiceProviderStack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="profile"
    >
      <ServiceProviderStack.Screen
        name="profile"
        component={Profile}
      />
      <ServiceProviderStack.Screen
        name="calender"
        component={MyCalender}
      />
      <ServiceProviderStack.Screen
        name="serviceProviderNotifications"
        component={Notifications}
      />
       <ServiceProviderStack.Screen
        name="serviceProviderMessages"
        component={Messages}
      />
    </ServiceProviderStack.Navigator>
  )
}

export default ServiceProviderNavigator