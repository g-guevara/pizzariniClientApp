// app/screens/WelcomeScreen.tsx
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
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
      <View style={styles.topIndicator}>
        <View style={styles.indicator} />
      </View>

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

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
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
      </View>

      {/* Bottom indicator */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    gap: 12,
  },
  appleButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    backgroundColor: '#4285F4',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bottomIndicator: {
    height: 4,
    backgroundColor: '#000',
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: Platform.OS === 'ios' ? 10 : 5,
  },
});