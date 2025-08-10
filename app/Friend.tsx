import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const friendsData = [
  {
    id: "1",
    name: "Mohamed",
    status: "accept",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  
];

export default function FriendsScreen() {
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState(friendsData);
  const [user, setUser] = useState(null);
  useEffect(() => {
    loaduser();
    loadFriends();
  }, []);

  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    // console.log(userObject.name);
  }

  function loadFriends() {
    var formData = new FormData();
    formData.append("user_id", user?.id);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setFriends(responseJSONText);
        console.log(response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-friends.php",
      true
    );
    request.send(formData);
  }

  const handleSearch = (text) => {
    console.log("Search pressed: " + text);
  };
  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <View className="flex-row items-center">
        <Image
          className="w-10 h-10 rounded-full mr-3"
          source={{
            uri:
              "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
              item.profile_pic,
          }}
          resizeMode="cover"
        />
        <Text className="text-gray-800">{item.name}</Text>
      </View>
      <TouchableOpacity
        className="bg-gray-100 p-2 rounded"
        onPress={() => router.push("/Chat")}
      >
        <Text className="text-gray-600">
          <MaterialCommunityIcons
            name="android-messages"
            color="#000"
            size={24}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-4">
        <Text className="text-xl font-bold text-center mb-4 mt-5">Friends</Text>
        {/* Search Bar */}
        <View className="px-1 py-3">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
            <Text className="text-gray-400 mr-3">
              {" "}
              <Ionicons name="search-outline" color="#000" size={24} />
            </Text>
            <TextInput
              placeholder="Search for friends"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                handleSearch(text);
              }}
              className="flex-1 text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

          <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
          />
     
      </View>
    </SafeAreaView>
  );
}
