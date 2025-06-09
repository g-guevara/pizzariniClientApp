// app/styles/WelcomeScreenStyles.ts
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topIndicator: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
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
    color: '#000', // Changed to red
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
    backgroundColor: '#DC2626', // Changed to red
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 22 : 30,
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
    backgroundColor: '#991b1b', // Darker red for better contrast against red card
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
    borderWidth: 2,
    borderColor: '#fff', // Changed to white for better contrast against red background
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // Changed to white for better contrast against red background
  },
  bottomIndicator: {
    height: 4,
    backgroundColor: '#fff', // Changed to white for better contrast against red background
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 8,
  },
});