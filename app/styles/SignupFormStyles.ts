// app/styles/SignupFormStyles.ts
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
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
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
  },
  inputFocused: {
    borderColor: "#DC2626", // Red border when focused
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  passwordInputFocused: {
    borderColor: "#DC2626", // Red border when focused
    backgroundColor: "#fff",
  },
  showPasswordButton: {
    position: "absolute",
    right: 15,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  showPasswordText: {
    color: "#DC2626", // Changed to red
    fontSize: 14,
    fontWeight: "600",
  },
  passwordStrengthContainer: {
    width: "100%",
    marginBottom: 10,
  },
  passwordStrengthBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 5,
  },
  passwordStrengthProgress: {
    height: "100%",
    borderRadius: 3,
  },
  passwordStrengthLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  passwordRequirements: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#DC2626",
  },
  requirementText: {
    fontSize: 12,
    marginBottom: 3,
    paddingLeft: 4,
  },
  requirementMet: {
    color: "#16a34a", // Green for met requirements
  },
  requirementNotMet: {
    color: "#999",
  },
  passwordMatchText: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: "right",
    fontWeight: "500",
  },
  passwordMatch: {
    color: "#16a34a", // Green for match
  },
  passwordNoMatch: {
    color: "#DC2626", // Red for no match
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