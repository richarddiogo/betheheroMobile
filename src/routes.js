import React from 'react';

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Clients  from './pages/Clients'
import Detail from './pages/Details'

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Clients" component={Clients}/>
                <AppStack.Screen name="Detail"  component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}