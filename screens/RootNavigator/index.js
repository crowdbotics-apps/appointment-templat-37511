import React from "react"
import ClientNavigator from "./ClientNavigator"
import ServiceProviderNavigator from "./ServiceProviderNavigator"
import login from "../../modules/social-login"
import { createStackNavigator } from "@react-navigation/stack"
import Welcome from "../ClientView/welcomeScreen"
const RootNavigator = () => {
    const RootStack = createStackNavigator()

    return (
        <RootStack.Navigator
            initialRouteName="welcome"
            screenOptions={{
                headerBackTitleVisible: false
            }}
        >
             <RootStack.Screen
                name="welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="ClientNavigator"
                component={ClientNavigator}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="login"
                component={login.navigator}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="ServiceProviderNavigator"
                component={ServiceProviderNavigator}
                options={{ headerShown: false }}
            />

        </RootStack.Navigator>
    )
}

export default RootNavigator
