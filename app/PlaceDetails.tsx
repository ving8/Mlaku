//@ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card } from 'react-native-paper';
import Colors from '@/constants/Colors';

const PlaceDetails: React.FC = () => {
  const { place } = useLocalSearchParams();
  
  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const parsedPlace = JSON.parse(place);

  const { name, photo, category, description } = parsedPlace;

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      
      <Card style={styles.cardContainer}>
        <Image source={{ uri: photo }} style={styles.gambar} />
        <Card.Content>
          <Text style={styles.cardText}>{name}</Text>
          <Text>{category.name}</Text>
          <Text style={styles.description}>{description}</Text>
          
        </Card.Content>
      </Card>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: Colors.white,
  },
  cardText: {
    marginTop: 12,
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 10,
  },
  gambar: {
    width: '100%',
    height: 200,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.darkGray,
  },
});

export default PlaceDetails;
