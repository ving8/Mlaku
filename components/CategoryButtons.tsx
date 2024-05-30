import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
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

const CategoryButton: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const placesData = await response.json();
      
      // Ensure the data is in the expected format and filter duplicates
      let uniquePlaces: Place[] = [];
      let placeIds = new Set<string>();

      if (Array.isArray(placesData)) {
        uniquePlaces = placesData.filter((place: Place) => {
          if (!placeIds.has(place.id)) {
            placeIds.add(place.id);
            return true;
          }
          return false;
        });
      } else if (placesData.data && Array.isArray(placesData.data)) {
        uniquePlaces = placesData.data.filter((place: Place) => {
          if (!placeIds.has(place.id)) {
            placeIds.add(place.id);
            return true;
          }
          return false;
        });
      } else {
        throw new Error('Unexpected API response format');
      }
      
      setPlaces(uniquePlaces);
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from(new Set(places.map(place => place.category.name)))
            .map((category, index) => {
              const place = places.find(place => place.category.name === category);
              return (
                place && (
                  <Pressable
                    key={index}
                    onPress={() => router.push({ pathname: 'CategoryDetail', params: { place: JSON.stringify(place) } })}
                  >
                    <Card style={styles.cardContainer}>
                      <Card.Content>
                        <Text>{place.category.name}</Text>
                      </Card.Content>
                    </Card>
                  </Pressable>
                )
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cardContainer: {
    marginHorizontal: 7,
    marginTop: 8,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 18,
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

export default CategoryButton;
