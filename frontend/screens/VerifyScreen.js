import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const BASE_URL = "http://129.236.229.250:8080/auth";

export default function VerifyScreen({ route, navigation }) {
  const [code, setCode] = useState("");
  const email = route.params?.email || "";

  const handleVerify = async () => {
    try {
      const res = await fetch(`${BASE_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: code })
      });

      if (res.ok) {
        Alert.alert("Success", "Account verified!");
        navigation.replace("Login");
      } else {
        const error = await res.text();
        Alert.alert("Verification Failed", error);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch(`${BASE_URL}/resend?email=${encodeURIComponent(email)}`, {
        method: "POST",
      });

      if (res.ok) {
        Alert.alert("Success", "Verification code resent!");
      } else {
        const error = await res.text();
        Alert.alert("Resend Failed", error);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <TextInput 
        placeholder="Verification Code" 
        style={styles.input} 
        value={code} 
        onChangeText={setCode} 
      />
      <Button title="Verify" onPress={handleVerify} />
      <View style={{ marginTop: 15 }}>
        <Button title="Resend Code" onPress={handleResend} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }
});
