# MeChat 💬

A modern, feature-rich React Native chat application that brings people together through seamless messaging, file sharing, and social networking features.

![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)
![Node](https://img.shields.io/badge/Node-22.16.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### 🗨️ **Real-time Messaging**
- Instant messaging with real-time synchronization
- Message status indicators (sent, delivered, read)
- Typing indicators
- Message history and persistence

### 📁 **File Sharing**
- Share images, documents, and media files
- File preview and download functionality
- Support for multiple file formats
- Optimized file compression

### 👥 **Social Networking**
- Search and discover friends
- Send and receive friend requests
- Friend list management
- Online status indicators

### 👤 **Profile Management**
- Customizable user profiles
- Profile picture upload and management
- Status updates
- Privacy settings

### 🔐 **Authentication**
- Secure user registration and login
- Password encryption and validation
- Session management
- Account recovery options

### 🎨 **Modern UI/UX**
- Clean and intuitive interface
- Responsive design for all screen sizes
- Dark/Light theme support
- Smooth animations and transitions

## 📱 Screenshots

*Coming soon - Screenshots will showcase the beautiful interface of MeChat*

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Login Screen  │    │  Chat Interface │    │ Profile Screen  │
│                 │    │                 │    │                 │
│  [Login Form]   │    │  [Messages]     │    │  [User Info]    │
│  [Sign Up]      │    │  [Input Field]  │    │  [Settings]     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.5
- **Runtime**: Node.js 22.16.0
- **Package Manager**: npm 10.9.2
- **Development Environment**: 
  - Android Studio AI-243.26053.27.2432.13536105
  - Visual Studio Community 2022 (17.14.36408.4)
- **Language**: JavaScript/TypeScript
- **Java Version**: 17.0.15

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22.16.0 or higher)
- **npm** (v10.9.2 or higher)
- **Android Studio** (for Android development)
- **Visual Studio** (for Windows development)
- **Java JDK** (v17.0.15 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JaniduChamika/MeChat.git
   cd MeChat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   cp .env.example .env
   
   # Configure your environment variables
   # Add your API endpoints, database URLs, etc.
   ```

4. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### 📱 Running the Application

#### For Android:
```bash
# Start Metro bundler
npm start

# Run on Android device/emulator
npm run android
```

#### For iOS:
```bash
# Run on iOS simulator
npm run ios
```

#### For Development:
```bash
# Start with cache reset
npm start --reset-cache

# Run with specific device
npx react-native run-android --device="Your-Device-Name"
```
## 🔧 Configuration

### Android Setup
1. Ensure Android SDK is properly configured
2. Set up environment variables for Android development
3. Configure signing keys for release builds

### iOS Setup (macOS only)
1. Install Xcode from the App Store
2. Install CocoaPods: `sudo gem install cocoapods`
3. Configure iOS development certificates

### Backend Configuration
```javascript
// Example API configuration
const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL,
  SOCKET_URL: process.env.SOCKET_URL,
  TIMEOUT: 10000,
};
```
## 🤝 Contributing

We welcome contributions to MeChat! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Issues & Support

If you encounter any issues or need support:

1. Check existing [Issues](https://github.com/JaniduChamika/MeChat/issues)
2. Create a new issue with detailed description
3. Include system information and error logs
4. Follow the issue template

## 🌟 Acknowledgments

- React Native community for the amazing framework
- All contributors who helped make MeChat better
- Open source libraries that power this application


⭐ **Star this repository if you found it helpful!** ⭐

*Built with ❤️ using React Native*
