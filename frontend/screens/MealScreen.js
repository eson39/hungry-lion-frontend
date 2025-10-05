import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = "http://localhost:8080/menu";

export default function MealScreen({ meal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedHalls, setExpandedHalls] = useState({});

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

  const toggleHall = (hallName) => {
    setExpandedHalls(prev => ({
      ...prev,
      [hallName]: !prev[hallName],
    }));
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  }

  if (!data || !data.diningHalls) {
    return <Text style={styles.error}>No data available.</Text>;
  }

  return (
    <FlatList
      data={data.diningHalls}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => {
        const isExpanded = expandedHalls[item.name];
        return (
          <View style={styles.hallCard}>
            <TouchableOpacity style={styles.hallHeader} onPress={() => toggleHall(item.name)}>
              <Text style={styles.hallName}>{item.name}</Text>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="black" 
              />
            </TouchableOpacity>
            {isExpanded && (
              <View style={styles.hallContent}>
                <Text style={styles.hours}>{item.hours}</Text>
                {item.stations.map((station, idx) => (
                  <View key={idx} style={styles.stationBlock}>
                    <Text style={styles.stationName}>{station.name}</Text>
                    {station.items.map((food, fIdx) => (
                      <Text key={fIdx} style={styles.foodItem}>• {food}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  hallCard: {
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  hallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  hallName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hallContent: {
    padding: 10,
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
