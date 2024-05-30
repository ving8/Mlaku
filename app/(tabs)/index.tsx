import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import {useHeaderHeight} from '@react-navigation/elements';
import CategoryButtons from '@/components/CategoryButtons';
import { useState } from "react";
import Listings from '@/components/Listings';
import { Card } from 'react-native-paper';

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [places, setPlaces] = useState([]);
  const getPlaces = async () => {
    const response = await fetch("https://dewalaravel.com/api/places");
    const placesData = await response.json();

    console.log(placesData);
  };

  return (
   <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: "",
    
    }}/>
    <View style={[styles.container, {paddingTop: headerHeight}]}>
      <Text style={[styles.headingText]}>Hai, temans...🤘</Text>
      <Text style={[styles.textkecil]}>Ayo mlaku mlaku reeeek!</Text>

    


      <CategoryButtons/>
      <Listings/>

    </View>
    
  </>
  );

};

export default Page

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor
  },

  headingText: {
    fontSize: 42,
    fontWeight: '800',
    color: 'black',
    marginTop: -20,

  },

  textkecil: {
    fontSize: 17,
    color: 'black',
    marginTop: 1,
    marginLeft: 2,
    marginBottom: 12,
  },

  SearchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  SearchBar: {
    marginTop: 22,
    width: 375,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },

  seacrhicon: {
    marginRight: 17,
  },

  
})