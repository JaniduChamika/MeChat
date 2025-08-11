import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function FriendsScreen() {
  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  useEffect(() => {
    loaduser();
  }, []);
  useEffect(() => {
    loadFriends();
  }, [user]);

  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    // console.log(userObject.name);
  }

  async function loadFriends() {
    var formData = new FormData();
    formData.append("user_id", user?.id);
    var request = new XMLHttpRequest();
    request.onreadystatechange = await function () {
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
    <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
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
        <View className="flex-col items-start">
          <Text className="text-gray-800">{item.name}</Text>
          <Text className="text-gray-400 text-xs">{item.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-gray-100 p-2 rounded"
        onPress={() =>
          router.push({
            pathname: "/Chat",
            params: {
              friendId: item.id,
              name: item.name,
              profilePic: item.profile_pic,
            },
          })
        }
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
      <View className="py-2 px-2">
        <Text className="text-xl font-bold text-center  ">Friends</Text>
        {/* Search Bar */}
        <View className="px-4 py-3">
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

      {/* Floating Add Friend Button */}
      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        className="absolute bottom-10 right-6 w-14 h-14 bg-blue-400 rounded-full items-center justify-center active:bg-blue-600"
        style={{
          shadowColor: "#1184C1",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Ionicons name="add" color="#fff" size={30} />
      </TouchableOpacity>

      {/* Add Friend Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="w-full max-w-sm bg-white rounded-2xl p-6">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person-add" color="#0af" size={20} />
                </View>
                <Text className="text-lg font-bold text-black">Add Friend</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  setFriendEmail("");
                }}
                className="w-8 h-8 items-center justify-center rounded-full active:bg-gray-100"
              >
                <Ionicons name="close" color="#000" size={24} />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text className="text-sm text-gray-600 mb-4">
              Send a friend request by entering their email address below.
            </Text>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Friend's Email Address
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1">
                <Ionicons name="mail" color="#9CA3AF" size={20} />
                <TextInput
                  placeholder="Enter email address"
                  value={friendEmail}
                  onChangeText={setFriendEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="flex-1 ml-3 text-black"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  setFriendEmail("");
                }}
                className="flex-1 py-3 px-4 mr-2 border border-gray-300 rounded-xl items-center active:bg-gray-50"
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={handleAddFriend}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 ml-2 rounded-xl items-center ${
                  isLoading ? "bg-blue-300" : "bg-blue-500 active:bg-blue-600"
                }`}
              >
                <Text className="text-white font-semibold">
                  {isLoading ? "Sending..." : "Add Friend"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
