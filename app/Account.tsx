import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
      Alert,
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
import Feather from "react-native-vector-icons/Feather";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState();
  const [countries, setCountries] = useState([
    { label: "Country", value: "0" },
  ]);
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/profile-default.png")
  );
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    loadCountry();
    loaduser();
  }, []);
  function loadCountry() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setCountries(responseJSONText);
        // console.log(response);
      }
    };
    request.open(
      "GET",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-country.php",
      true
    );
    request.send();
  }

  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    let current_profile = {
      uri:
        "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
        userObject.profile_url,
      name: user?.name + ".jpg",
    };
    setProfileImage(current_profile);
    setName(userObject.name);
    setEmail(userObject.email);
    setCountry(userObject.country_id);

    console.log("User load: " + userObject.profile_url);
  }
  function updateAccount() {
    setIsUpdate(true);
    var requestMsgObject = {
      userId: user?.id,
      useremail: email,
      username: name,
      usercountry: country,
    };
    var reqMsgJsonobject = JSON.stringify(requestMsgObject);
    var formData = new FormData();
    formData.append("reqMsgJsonobject", reqMsgJsonobject);
    if (profileImage.name == "profileImage.png") {
      formData.append("profile_pic", profileImage);
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = async function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsonResponseText = request.responseText;
      //   console.log(jsonResponseText);
        var jsResponseObject = JSON.parse(jsonResponseText);

        if (jsResponseObject.msg == "Success") {
          var userObject = jsResponseObject.user;
          await AsyncStorage.setItem("user", JSON.stringify(userObject));
          Alert.alert("Success", "Account updated successfully.");
          setIsUpdate(false);
        } else {
          Alert.alert("Error", jsResponseObject.msg);
          setIsUpdate(false);
        }
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/update-account.php",
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
      // console.log(imgObject);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // moves view up
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // adjust for headers
      >
        <View className="flex-row items-center justify-between px-4  py-3 border-b border-t border-gray-100 ">
          <View className="flex-row items-center flex-1 ">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Text className="text-black text-xl">
                <Feather name="arrow-left" color="#000" size={24} />
              </Text>
            </TouchableOpacity>

            <Text className="text-xl text-center font-bold text-black">
              Account
            </Text>
          </View>
        </View>
        {/* Content */}
        <View className="flex-1 px-8 pt-2 justify-start">
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
                <Text className="text-gray-600 text-xs">
                  {" "}
                  <Feather name="edit" color="#000" size={15} />{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*  Name Input */}
          <View className="mb-3">
            <Text className="text-md font-semibold text-gray-700 mb-2">
              Name
            </Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email Input */}
          <View className="mb-3">
            <Text className="text-md font-semibold text-gray-700 mb-2">
              Email
            </Text>
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
            <Text className="text-md font-semibold text-gray-700 mb-2">
              Country
            </Text>
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

          {/* update Button */}
          <TouchableOpacity
            onPress={updateAccount}
            className="w-full bg-blue-500 py-4 rounded-full mb-5 active:bg-blue-600"
            disabled={isUpdate}
          >
            <Text className="text-white text-base font-semibold text-center">
              Update
            </Text>
          </TouchableOpacity>
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
