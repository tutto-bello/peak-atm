import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { useAuth } from '../auth/auth-context';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { useKeyboard } from '@react-native-community/hooks';

const LoginScreen = () => {
  const { login } = useAuth();
  const { keyboardHeight } = useKeyboard();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const success = login(password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
              Login
            </Text>
            <TextInput
              label="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} uppercase>
              Login as Operator
            </Button>
            <View
              style={[
                styles.snackbarContainer,
                { bottom: keyboardHeight > 0 ? keyboardHeight - 140 : 20 },
              ]}
            >
              <Snackbar
                visible={error}
                onDismiss={() => setError(false)}
                duration={3000}
              >
                Incorrect password. Try again.
              </Snackbar>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 0 : -40 },
  flexContainer: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'stretch',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  title: {
    marginTop: 24,
  },
  input: {
    marginVertical: 16,
  },
  snackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginVertical: 16,
  },
});
