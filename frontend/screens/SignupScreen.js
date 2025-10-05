import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const BASE_URL = "http://localhost:8080/auth";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });

      if (res.ok) {
        Alert.alert("Success", "Account created! Please verify your email.");
        // Auto-navigate to Verify screen with email
        navigation.navigate("Verify", { email });
      } else {
        const error = await res.text();
        Alert.alert("Signup Failed", error);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput 
        placeholder="Password" 
        style={styles.input} 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  link: { marginTop: 15, color: "blue", textAlign: "center" }
});
