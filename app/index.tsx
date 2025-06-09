// app/index.tsx - Versión con pantalla de bienvenida
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { User } from "./components/User";
import { diagnoseAuth, getUser, removeUser, saveUser } from "./lib/authUtils";
import TabNavigator from "./navigation/TabNavigator";
import LoginForm from "./screens/LoginForm";
import SignupForm from "./screens/SignupForm";
import { styles } from "./styles/IndexStyles";
import { useToast } from './utils/ToastContext';

// URL de tu API
const API_URL = "https://pizzarini-client-app.vercel.app/";

// Tipos de pantalla
type ScreenType = 'welcome' | 'login' | 'signup';

// Componente WelcomeScreen inline (temporal)
interface WelcomeScreenProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const WelcomeScreen = ({ onNavigateToLogin, onNavigateToSignup }: WelcomeScreenProps) => {
  const { showToast } = useToast();

  const handleAppleSignIn = () => {
    showToast('Apple Sign In coming soon!', 'info');
  };

  const handleGoogleSignIn = () => {
    showToast('Google Sign In coming soon!', 'info');
  };

  return (
    <SafeAreaView style={welcomeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Indicador superior */}
      <View style={welcomeStyles.topIndicator}>
        <View style={welcomeStyles.indicator} />
      </View>

      {/* Logo/Content Area */}
      <View style={welcomeStyles.contentArea}>
        <Image 
          source={require('../assets/images/icon.png')}
          style={welcomeStyles.logo}
        />
        <Text style={welcomeStyles.welcomeTitle}>Welcome</Text>
        <Text style={welcomeStyles.welcomeSubtitle}>
          Sign in to your account or create a new one
        </Text>
      </View>

      {/* Black Card Container */}
      <View style={welcomeStyles.blackCard}>
        {/* Continue with Apple */}
        <TouchableOpacity style={welcomeStyles.appleButton} onPress={handleAppleSignIn}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
            style={welcomeStyles.appleIcon}
            resizeMode="contain"
          />
          <Text style={welcomeStyles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <TouchableOpacity style={welcomeStyles.googleButton} onPress={handleGoogleSignIn}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
            style={welcomeStyles.googleIcon}
            resizeMode="contain"
          />
          <Text style={welcomeStyles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign up */}
        <TouchableOpacity style={welcomeStyles.signupButton} onPress={onNavigateToSignup}>
          <Text style={welcomeStyles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Log in */}
        <TouchableOpacity style={welcomeStyles.loginButton} onPress={onNavigateToLogin}>
          <Text style={welcomeStyles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* Bottom white indicator inside card */}
        <View style={welcomeStyles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

// Estilos para WelcomeScreen
const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topIndicator: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  blackCard: {
    backgroundColor: '#000',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  appleButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#000',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  googleButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#666',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomIndicator: {
    height: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 8,
  },
});;

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión activa al iniciar la app
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      console.log('[Index] Verificando autenticación...');
      const userData = await getUser();
      console.log('[Index] Datos de usuario obtenidos:', {
        hasUser: !!userData,
        email: userData?.email,
        userID: userData?.userID
      });
      
      if (userData && userData.userID && userData.email) {
        // Validar que los datos del usuario sean válidos
        if (typeof userData.userID === 'string' && userData.userID.length > 0) {
          console.log('[Index] Usuario válido encontrado:', userData.name);
          setUser(userData);
        } else {
          console.log('[Index] Datos de usuario inválidos, limpiando...');
          await removeUser();
          setUser(null);
          setCurrentScreen('welcome');
        }
      } else {
        console.log('[Index] No se encontró usuario válido');
        if (userData) {
          await removeUser();
        }
        setUser(null);
        setCurrentScreen('welcome');
      }
    } catch (error) {
      console.error('[Index] Error verificando autenticación:', error);
      try {
        await removeUser();
      } catch (cleanupError) {
        console.error('[Index] Error limpiando datos:', cleanupError);
      }
      setUser(null);
      setCurrentScreen('welcome');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData: User) => {
    try {
      console.log('[Index] Procesando login con datos:', {
        email: userData.email,
        userID: userData.userID,
        name: userData.name
      });
      
      if (!userData) {
        throw new Error('Datos de usuario vacíos');
      }
      
      if (!userData.email || !userData.name) {
        throw new Error('Datos de usuario incompletos: faltan email o nombre');
      }
      
      // Asegurar que el userData tiene userID
      if (!userData.userID && userData._id) {
        console.log('[Index] Asignando _id como userID');
        userData.userID = userData._id;
      }
      
      if (!userData.userID) {
        console.error('[Index] Error: No userID encontrado en los datos');
        throw new Error('Datos de usuario inválidos: falta identificador de usuario');
      }
      
      // Guardar usuario y actualizar estado
      console.log('[Index] Guardando datos de usuario...');
      const savedUser = await saveUser(userData);
      
      console.log('[Index] Usuario guardado exitosamente');
      setUser(savedUser);
      
      console.log('[Index] Login completado exitosamente para:', savedUser.name);
    } catch (error) {
      console.error('[Index] Error durante login:', error);
      await diagnoseAuth();
      
      Alert.alert(
        'Error de Login',
        `Hubo un problema durante el login: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        [{ text: 'OK' }]
      );
      
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      console.log('[Index] Iniciando logout...');
      
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro que quieres cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Cerrar Sesión', 
            style: 'destructive',
            onPress: async () => {
              try {
                await removeUser();
                setUser(null);
                setCurrentScreen('welcome');
                console.log('[Index] Logout completado exitosamente');
              } catch (error) {
                console.error('[Index] Error durante logout:', error);
                Alert.alert('Error', 'Hubo un problema cerrando la sesión');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('[Index] Error iniciando logout:', error);
    }
  };

  const handleSignupSuccess = () => {
    // Después de un registro exitoso, ir al login
    setCurrentScreen('login');
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      </SafeAreaView>
    );
  }

  // Si el usuario está logueado, mostrar el tab navigator
  if (user) {
    return <TabNavigator user={user} onLogout={handleLogout} />;
  }

  // Renderizar según la pantalla actual
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
            onNavigateToSignup={() => setCurrentScreen('signup')}
          />
        );
      case 'login':
        return (
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <LoginForm 
                onLogin={handleLogin}
                onSwitchToSignup={() => setCurrentScreen('signup')}
                onBackToWelcome={() => setCurrentScreen('welcome')}
                apiUrl={API_URL}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        );
      case 'signup':
        return (
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <SignupForm 
                onSwitchToLogin={() => setCurrentScreen('login')}
                onBackToWelcome={() => setCurrentScreen('welcome')}
                onSignupSuccess={handleSignupSuccess}
                apiUrl={API_URL}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        );
      default:
        return (
          <WelcomeScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
            onNavigateToSignup={() => setCurrentScreen('signup')}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}