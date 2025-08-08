import React, { useState } from 'react';
import {
      SafeAreaView,
      Text,
      TextInput,
      TouchableOpacity,
      View
} from 'react-native';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
    console.log('Send link pressed');
  };

  const handleBackPress = () => {
    console.log('Back pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
     
    
        {/* Content */}
        <View className="flex-1 px-8 pt-6 justify-center">
          {/* Title */}
          <Text className="text-4xl font-bold text-blue-500 mb-20">Reset Password</Text>

          {/* Email Input */}
          <View className="mb-12">
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full py-4 border-b border-gray-200 text-base text-black focus:border-blue-300"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Send Link Button */}
          <TouchableOpacity
            onPress={handleSendLink}
            className="w-full bg-blue-500 py-4 rounded-full mb-8 active:bg-blue-600"
          >
            <Text className="text-white text-base font-semibold text-center">
              Send Link
            </Text>
          </TouchableOpacity>
        </View>
 
    </SafeAreaView>
  );
};

