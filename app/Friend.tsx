import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';


const friendsData = [
  { id: '1', name: 'Mohamed', status: 'accept', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '2', name: 'Andrew Kawanzi', status: 'accept', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '3', name: 'Darren Black', status: 'unfriend', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '4', name: 'Leasa Richardson', status: 'unfriend', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '5', name: 'Florian Marcu', status: 'unfriend', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face' },
  { id: '6', name: 'Curtis George', status: 'unfriend', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face' },
  { id: '7', name: 'Craig Nelson', status: 'unfriend', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face' },
  { id: '8', name: 'Camila Bradley', status: 'unfriend', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face' },
  { id: '9', name: 'Mark Twain', status: 'unfriend', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face0' },
  { id: '10', name: 'Barbara Streisand', status: 'cancel', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face' },
];

const FriendsScreen = () => {
 

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <View className="flex-row items-center">
           
        <Image className="w-10 h-10 rounded-full mr-3" source={{ uri: item.image }} resizeMode="cover" />
        <Text className="text-gray-800">{item.name}</Text>
      </View>
      <TouchableOpacity className="bg-gray-100 p-2 rounded">
        <Text className="text-gray-600">{item.status}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xl font-bold text-center mb-4">Friends</Text>
        <TextInput
          className="bg-gray-100 p-2 mb-4 rounded-lg"
          placeholder="Search for friends"
        />
        <FlatList
          data={friendsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;