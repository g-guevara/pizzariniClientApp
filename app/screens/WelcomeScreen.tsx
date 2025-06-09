// app/screens/WelcomeScreen.tsx
import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from '../styles/WelcomeScreenStyles';
import { useToast } from '../utils/ToastContext';

interface WelcomeScreenProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export default function WelcomeScreen({ onNavigateToLogin, onNavigateToSignup }: WelcomeScreenProps) {
  const { showToast } = useToast();

  const handleAppleSignIn = () => {
    showToast('Apple Sign In coming soon!');
  };

  const handleGoogleSignIn = () => {
    showToast('Google Sign In coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Indicador superior */}


      {/* Logo/Content Area */}
      <View style={styles.contentArea}>
        <Image 
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeSubtitle}>
          Sign in to your account or create a new one
        </Text>
      </View>

      {/* Black Card Container */}
      <View style={styles.blackCard}>
        {/* Continue with Apple */}
        <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
            style={styles.appleIcon}
            resizeMode="contain"
          />
          <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign up */}
        <TouchableOpacity style={styles.signupButton} onPress={onNavigateToSignup}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Log in */}
        <TouchableOpacity style={styles.loginButton} onPress={onNavigateToLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* Bottom white indicator inside card */}
      </View>
    </SafeAreaView>
  );
}