import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo-hooks'
import { setContext } from '@apollo/client/link/context';
import { getToken } from './util' 

const AppStack = createStackNavigator();

const IP = '192.168.43.141'
const uri = `http://${IP}:4000/graphql`;
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  }
});
const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import  Login from './scr/login/login'
import  Home from './scr/home/home'
import  Asset from './scr/asset/asset'
import  AssetChecked from './scr/asset/asset_checked'
import  AssetNotChecked from './scr/asset/asset_not_check'
import  Scanner from './scr/scanner/scanner'
import  Dashboard from './scr/dashboard/dashboard'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{  headerShown: true,
          headerTitleAlign:"center",
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2280c9',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            // fontWeight: '500',
            // fontWeight: 'bold',
            fontSize: 25,
          }
          }} >
          <AppStack.Screen name="Login" component={Login} options={{headerShown: false }} />
          <AppStack.Screen name="Home" component={Home} options={{ headerLeft: null,headerTitle:"รายการ",}}/>
          <AppStack.Screen name="Asset" component={Asset} options={{ headerLeft: null,headerTitle:"ตรวจนับครุภัณฑ์",}}/>
          <AppStack.Screen name="AssetChecked" component={AssetChecked} options={{ headerLeft: null,headerTitle:"ครุภัณฑ์ที่ตรวจนับแล้ว",}}/>
          <AppStack.Screen name="AssetNotChecked" component={AssetNotChecked} options={{ headerLeft: null,headerTitle:"ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ",headerTitleStyle: {fontSize: 20,}}}/>
          <AppStack.Screen name="Scanner" component={Scanner} options={{ headerTitle:"สแกนเพื่อตรวจนับ",}}/> 
          <AppStack.Screen name="Dashboard" component={Dashboard} options={{ headerLeft: null,headerTitle:"ตรวจนับครุภัณฑ์",}}/>

        </AppStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}