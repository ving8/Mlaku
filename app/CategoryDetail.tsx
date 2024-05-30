import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
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
  slug: string;
}

const CategoryDetail: React.FC = () => {
  const params = useLocalSearchParams();
  const placeData: Place = JSON.parse(params.place as string);
  const router = useRouter();

  return (
    <>
    <Text style={styles.title}>{placeData.category.name}</Text>
    

    <Pressable
    key={placeData.slug}
    onPress={() => router.push({ pathname: 'PlaceDetails', params: { place: JSON.stringify(placeData) } })}
    style={styles.container}>

        <Card style={styles.cardContainer}>
        <Image source={{ uri: placeData.photo }} style={styles.gambar} />
            <Card.Content>
                <Text style={styles.name}>{placeData.name}</Text>
                {/* Here you can add more detailed view */}
            </Card.Content>
        </Card>
    </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
   
    alignItems: 'center',
    padding: 16,
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: 40

    
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },


  gambar: {
    width: '100%',
    height: 200,
  },
});

export default CategoryDetail;
