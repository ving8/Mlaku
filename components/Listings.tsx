
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface Place {
  id: string;
  category: {
    name: string;
  };
  name: string;
  photo: string;
  description: string;
}

const Listings: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const placesData = await response.json();
      // Ensure the data is in the expected format
      if (Array.isArray(placesData)) {
        setPlaces(placesData);
      } else if (placesData.data && Array.isArray(placesData.data)) {
        setPlaces(placesData.data);
      } else {
        throw new Error('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to load places');
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView  showsVerticalScrollIndicator={false} >
          {places.map((place) => (
            <Pressable
              key={place.id}
              onPress={() => router.push({ pathname: 'PlaceDetails', params: { place: JSON.stringify(place) } })}
            >
              <Card style={styles.cardContainer}>
                <Image source={{ uri: place.photo }} style={styles.gambar} />
                <Card.Content>
                  <Text style={styles.cardText}>{place.name}</Text>
                  <Text>{place.category.name}</Text>
                </Card.Content>
              </Card>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  cardContainer: {
    width:350,
    marginHorizontal: 7,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    backgroundColor: Colors.white,
    
  },
  cardText: {
    justifyContent: 'center',
    marginTop: 9,
    fontWeight: '800',
  },
  gambar: {
    width: '100%',
    height: 200,
  },
});

export default Listings;
