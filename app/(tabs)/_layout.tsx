import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';

export default function Layout () {
  return(
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: Colors.bgColor,
        borderTopWidth: 0,
        padding: 0,
        
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.primaryColor,
      tabBarInactiveTintColor: '#999'
    }}>
    <Tabs.Screen name='index' 
    options={{
      tabBarIcon: ({color}) => (
      <Ionicons name="home" size={28} color={color} />
    )}}/>

    <Tabs.Screen name='search' options={{
      tabBarIcon: ({color}) => (
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 10,
         
        }}>
        <Ionicons name="search" size={28} color={color}/>
        </View>
    )}}/>

    </Tabs>
  );
}