// app/screens/LoginForm.tsx - Versión con navegación a Welcome
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { User } from "../components/User";
import { saveUser } from "../lib/authUtils";
import { ApiService } from "../services/api";
import { useToast } from '../utils/ToastContext';

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4285F4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  googleButtonDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4285F4",
    fontSize: 14,
    textAlign: "center",
  },
  switchButton: {
    marginTop: 10,
  },
  switchButtonText: {
    color: "#4285F4",
    fontSize: 16,
    textAlign: "center",
  },
});

WebBrowser.maybeCompleteAuthSession();

interface LoginFormProps {
  onLogin: (user: User) => void;
  onSwitchToSignup: () => void;
  onBackToWelcome: () => void;
  apiUrl: string;
}

export default function LoginForm({ onLogin, onSwitchToSignup, onBackToWelcome, apiUrl }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { showToast } = useToast();

  // Configuración de Google OAuth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '421431845569-3gi5bflt29es9fo1ovrpc9tprmd6tj3s.apps.googleusercontent.com',
  });

  useEffect(() => {
    handleGoogleResponse();
  }, [response]);

  const handleGoogleResponse = async () => {
    if (response?.type === 'success') {
      setGoogleLoading(true);
      try {
        const { params } = response;
        const { id_token } = params;
        
        // Decode the ID token to get user info
        const decodedToken = JSON.parse(atob(id_token.split('.')[1]));
        
        // Send Google token to your backend
        const loginResponse = await ApiService.googleLogin({
          idToken: id_token,
          accessToken: '', // ID token flow doesn't provide access token
          email: decodedToken.email,
          name: decodedToken.name,
          googleId: decodedToken.sub
        });
        
        if (loginResponse.user) {
          // Save user data in SecureStore
          await saveUser(loginResponse.user);
          onLogin(loginResponse.user);
          showToast('Signed in with Google', 'success');
        }
      } catch (error: any) {
        console.error("Google login error: ", error);
        showToast('Failed to sign in with Google', 'error');
      } finally {
        setGoogleLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    // Validación de campos
    if (!loginEmail || !loginPassword) {
      showToast('Por favor llena todos los campos', 'error');
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      showToast('Por favor ingresa un email válido', 'error');
      return;
    }

    setLoading(true);
    try {
      console.log('[Login] Intentando login con email:', loginEmail);
      
      const response = await ApiService.login(loginEmail.trim().toLowerCase(), loginPassword);
      
      console.log('[Login] Respuesta exitosa:', {
        hasUser: !!response.user,
        userID: response.user?.userID,
        userName: response.user?.name
      });
      
      if (!response.user) {
        throw new Error('Respuesta de login inválida: no se recibieron datos de usuario');
      }
      
      if (!response.user.userID && !response.user._id) {
        throw new Error('Respuesta de login inválida: el usuario no tiene ID');
      }
      
      // Asegurar que userID existe
      if (!response.user.userID && response.user._id) {
        response.user.userID = response.user._id;
      }
      
      // Guardar datos del usuario
      console.log('[Login] Guardando datos del usuario...');
      await saveUser(response.user);
      
      // Ejecutar callback de login exitoso
      onLogin(response.user);
      showToast('Login exitoso', 'success');
      
    } catch (error: any) {
      console.error("[Login] Error completo:", error);
      
      let errorMessage = 'Error de login';
      
      if (error.message) {
        if (error.message.includes('Credenciales inválidas')) {
          errorMessage = 'Email o contraseña incorrectos';
        } else if (error.message.includes('Network request failed')) {
          errorMessage = 'Error de conexión. Verifica tu internet';
        } else if (error.message.includes('Sesión expirada')) {
          errorMessage = 'Sesión expirada, intenta de nuevo';
        } else if (error.message.includes('formato de respuesta')) {
          errorMessage = 'Error del servidor. Intenta más tarde';
        } else {
          errorMessage = error.message;
        }
      }
      
      showToast(errorMessage, 'error');
      
      // Ejecutar diagnóstico en caso de error
      try {
        await ApiService.diagnosticarProblemas();
      } catch (diagError) {
        console.error('[Login] Error en diagnóstico:', diagError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Por favor contacta al soporte para recuperar tu contraseña.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.formContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBackToWelcome}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Sign In</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginEmail}
        onChangeText={setLoginEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginPassword}
        onChangeText={setLoginPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity 
        style={[styles.googleButton, (googleLoading || !request) && styles.googleButtonDisabled]} 
        onPress={() => promptAsync()}
        disabled={!request || googleLoading}
      >
        {googleLoading ? (
          <ActivityIndicator color="#555" />
        ) : (
          <>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
              style={styles.googleLogo}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotPasswordButton} 
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.switchButton} 
        onPress={onSwitchToSignup}
      >
        <Text style={styles.switchButtonText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}