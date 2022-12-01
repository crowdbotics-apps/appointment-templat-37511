import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseCategory from '../ClientView/categoryScreen';
import Home from '../ClientView/homeScreen';
import Search from '../ClientView/searchScreen';
import ServiceProviderProfile from '../ClientView/serviceProviderProfileScreen';
import Schedule from '../ClientView/scheduleScreen';
import Appointment from '../ClientView/appointmentScreen';
import Payment from '../ClientView/paymentScreen';
import ClientProfile from '../ClientView/clientProfileScreen';
import WalletScreen from '../ClientView/walletScreen';
import MyAppointments from '../ClientView/myAppointmentsScreen';
import Notifications from '../ClientView/clientNotificationsScreen';
import Messages from '../ClientView/clientMessagesScreen';

function ClientNavigator() {
  const ClientStack = createStackNavigator()
  return (
    <ClientStack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={"category"}
    >
      <ClientStack.Screen
        name="category"
        component={ChooseCategory}
      />
      <ClientStack.Screen
        name="home"
        component={Home}
      />
      <ClientStack.Screen
        name="search"
        component={Search}
      />
      <ClientStack.Screen
        name="serviceProviderProfile"
        component={ServiceProviderProfile}
      />
      <ClientStack.Screen
        name="schedule"
        component={Schedule}
      />
      <ClientStack.Screen
        name="appointment"
        component={Appointment}
      />
       <ClientStack.Screen
        name="payment"
        component={Payment}
      />
       <ClientStack.Screen
        name="clientProfile"
        component={ClientProfile}
      />
      <ClientStack.Screen
        name="walletScreen"
        component={WalletScreen}
      />
       <ClientStack.Screen
        name="myAppointments"
        component={MyAppointments}
      />
      <ClientStack.Screen
        name="clientNotifications"
        component={Notifications}
      />
       <ClientStack.Screen
        name="clientMessages"
        component={Messages}
      />
    </ClientStack.Navigator>
  )
}

export default ClientNavigator