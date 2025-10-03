import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const BASE_URL = "http://129.236.229.250:8080/menu"; 
// Android Emulator: http://10.0.2.2:8080/menu
// iOS Simulator: http://localhost:8080/menu
// Physical Device: http://<your-local-ip>:8080/menu

export default function MealScreen({ meal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/${meal}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [meal]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  }

  if (!data || !data.halls) {
    return <Text style={styles.error}>No data available.</Text>;
  }

  return (
    <FlatList
      data={data.halls}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => (
        <View style={styles.hallCard}>
          <Text style={styles.hallName}>{item.name}</Text>
          <Text style={styles.hours}>{item.hours}</Text>
          {item.stations.map((station, idx) => (
            <View key={idx} style={styles.stationBlock}>
              <Text style={styles.stationName}>{station.stationName}</Text>
              {station.items.map((food, fIdx) => (
                <Text key={fIdx} style={styles.foodItem}>• {food}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  hallCard: {
    backgroundColor: '#f8f8f8',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  hallName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stationBlock: {
    marginTop: 8,
    marginLeft: 10,
  },
  stationName: {
    fontWeight: '600',
    fontSize: 16,
  },
  foodItem: {
    fontSize: 14,
    marginLeft: 10,
  },
  error: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
