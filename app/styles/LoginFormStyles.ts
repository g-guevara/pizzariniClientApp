// app/styles/LoginFormStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: "#DC2626", // Changed to red
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    // Focus styles will be handled by the component
  },
  inputFocused: {
    borderColor: "#DC2626", // Red border when focused
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#DC2626", // Changed to red
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
    elevation: 0,
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    shadowOpacity: 0,
    elevation: 0,
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
    padding: 8,
  },
  forgotPasswordText: {
    color: "#DC2626", // Changed to red
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  switchButton: {
    marginTop: 10,
    padding: 8,
  },
  switchButtonText: {
    color: "#DC2626", // Changed to red
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});