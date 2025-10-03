import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to load user", err);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.info}>Username: {user.username}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
});
