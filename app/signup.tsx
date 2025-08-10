import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countries, setCountries] = useState([
    { label: "Country", value: "0" },
  ]);
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/profile-default.png")
  );

  useEffect(() => {
    loadCountry();
  }, []);
  function loadCountry() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setCountries(responseJSONText);
        console.log(response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-country.php",
      true
    );
    request.send();
  }
  function handleSignUp() {
    console.log("Sign up pressed");
    var useremail = email;
    var username = name;
    var pw = password;
    var confirmPw = confirmPassword;
    var profile_pic = profileImage;
    var usercountry = country;
    var formData = new FormData();
    formData.append("email", useremail);
    formData.append("name", username);
    formData.append("password", pw);
    formData.append("confirm_password", confirmPw);
    formData.append("country", usercountry);
    formData.append("profile_pic", profile_pic);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        if (response == "User registered successfully.") {
          router.push("/signin");
        }else{
          console.log(response);
        }
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/sign-up.php",
      true
    );

    request.send(formData);
  }
  async function pickProfileImage() {
    console.log("Profile image pressed");
    const options = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (result.canceled) {
      console.log("Image picker cancelled");
    } else {
      const content = result.assets[0].uri;
      // Alert.alert("Message ", content);
      const imgObject = {
        uri: result.assets[0].uri,
        name: "profileImage.png",
        type: "image/png",
      };
      setProfileImage(imgObject);
      console.log(imgObject);
    }
  }
  const handlePhoneSignUp = () => {
    console.log("Phone sign up pressed");
  };

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // moves view up
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // adjust for headers
      >
        {/* Content */}
        <View className="flex-1 px-8 pt-2 justify-center">
          {/* Title */}
          <Text className="text-3xl font-bold text-blue-500 mb-12">
            Sign Up
          </Text>

          {/* Profile Image */}
          <View className="items-center mb-10">
            <TouchableOpacity onPress={pickProfileImage} className="relative">
              <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <Image
                  source={profileImage}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              {/* Camera Icon */}
              <View className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 items-center justify-center">
                <Text className="text-gray-600 text-xs">📷</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*  Name Input */}
          <View className="mb-6">
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <TextInput
              placeholder="E-mail Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {/* Country select */}
          <View className="mb-6">
            <View style={[styles.pickerContainer]}>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                style={[styles.picker]}
                itemStyle={{ fontSize: 10 }}
              >
                <Picker.Item label="Country" value="none" />
                {countries.map((item) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="mb-10">
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="w-full bg-blue-500 py-4 rounded-full mb-5 active:bg-blue-600"
          >
            <Text className="text-white text-base font-semibold text-center">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Phone Sign Up */}
          <View className="items-center mb-8">
            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-black-500 text-center">
                Already have an account?{" "}
                <Text className="text-blue-500 font-semibold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    paddingVertical: 0, // To avoid cutting off picker text
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb", // border-gray-200
    borderRadius: 999, // pill shape
    backgroundColor: "#f9fafb", // bg-gray-50
  },
  pickerContainerFocused: {
    borderColor: "#93c5fd", // focus:border-blue-300
    backgroundColor: "#ffffff", // focus:bg-white
  },
  picker: {
    width: "100%",
    color: "#000000", // text-black
  },
});
