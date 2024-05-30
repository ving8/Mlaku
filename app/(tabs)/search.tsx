import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

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
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const placesData = await response.json();
      if (Array.isArray(placesData)) {
        setPlaces(placesData);
        setFilteredPlaces(placesData);
      } else if (placesData.data && Array.isArray(placesData.data)) {
        setPlaces(placesData.data);
        setFilteredPlaces(placesData.data);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = places.filter((place) =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  };

  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: "",
    
    }}/>
      <View style={styles.SearchSectionWrapper}>
        <View style={styles.SearchBar}>
          <Ionicons name="search" size={28} style={styles.searchIcon} />
          <TextInput
            placeholder='golek o panggon sak karepmu...'
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredPlaces.map((place) => (
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: 350,
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
  SearchSectionWrapper: {
    marginTop: 50,
    flexDirection: 'row',
    marginVertical: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  SearchBar: {
    marginTop: 22,
    width: 375,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 17,
  },
  searchInput: {
    flex: 1,
  },
});

export default Listings;
