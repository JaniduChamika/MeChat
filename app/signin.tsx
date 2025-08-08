import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import "./global.css";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    console.log("Log in pressed");
    router.push("/Layout")
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login pressed");
  };

  const handleAppleLogin = () => {
    console.log("Apple login pressed");
  };

  const handlePhoneLogin = () => {
    console.log("Phone login pressed");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
  };

  const handleBackPress = () => {
    console.log("Back pressed");
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Content */}
      <View className="flex-1 px-8 pt-6 justify-center">
        {/* Title */}
        <Text className="text-4xl font-bold text-blue-500 mb-16">Sign In</Text>

        {/* Email Input */}
        <View className="mb-6">
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Forgot Password */}
        <View className="items-end mb-10">
          <TouchableOpacity  onPress={() => router.push("/reset")}>
            <Text className="text-blue-500 text-sm">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Log In Button */}
        <TouchableOpacity
          onPress={handleLogIn}
          className="w-full bg-blue-400 py-4 rounded-full mb-5"
        >
          <Text className="text-white text-base font-semibold text-center">
            Log In
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        {/* <Text className="text-center text-gray-600 text-base mb-8">OR</Text> */}

        {/* Facebook Login */}
        {/* <TouchableOpacity
          onPress={handleFacebookLogin}
          className="w-full bg-blue-600 py-4 rounded-full mb-4 active:bg-blue-700"
        >
          <Text className="text-white text-base font-semibold text-center">
            Login With Facebook
          </Text>
        </TouchableOpacity> */}

        {/* Apple Login */}
        {/* <TouchableOpacity
          onPress={handleAppleLogin}
          className="w-full bg-black py-4 rounded-full mb-8 active:bg-gray-800 flex-row items-center justify-center"
        >
          <Text className="text-white text-base font-semibold mr-2">🍎</Text>
          <Text className="text-white text-base font-semibold">
            Sign in with Apple
          </Text>
        </TouchableOpacity> */}

        {/* Phone Login */}
        <View className="items-center mb-8">
          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push("/signup")}
          >
            <Text className="text-black-500 text-center">
              Already have an account?{" "}
              <Text className="text-blue-500 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

   
    </SafeAreaView>
  );
}
