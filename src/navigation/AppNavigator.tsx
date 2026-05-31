import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Auth
import SplashScreen         from '../screens/auth/SplashScreen';
import OnboardingScreen     from '../screens/auth/OnboardingScreen';
import LoginScreen          from '../screens/auth/LoginScreen';
import LocationScreen       from '../screens/auth/LocationScreen';
import LoadingScreen        from '../screens/auth/LoadingScreen';
import AccountTypeScreen    from '../screens/auth/AccountTypeScreen';

// User
import FeedScreen           from '../screens/user/FeedScreen';
import EventDetailScreen    from '../screens/user/EventDetailScreen';
import FeedFilterScreen     from '../screens/user/FeedFilterScreen';

// Creator registration
import CreatorStep1Screen        from '../screens/creator/CreatorStep1Screen';
import CreatorStep2Screen        from '../screens/creator/CreatorStep2Screen';
import CreatorStep3Screen        from '../screens/creator/CreatorStep3Screen';
import CreatorStep4Screen        from '../screens/creator/CreatorStep4Screen';
import RegistrationPendingScreen from '../screens/creator/RegistrationPendingScreen';
import AccountApprovedScreen     from '../screens/creator/AccountApprovedScreen';
import AccountRejectedScreen     from '../screens/creator/AccountRejectedScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: true, animationEnabled: true }}
      >
        {/* ── Onboarding ── */}
        <Stack.Screen name="Splash"      component={SplashScreen} />
        <Stack.Screen name="Onboarding"  component={OnboardingScreen} />
        <Stack.Screen name="Login"       component={LoginScreen} />
        <Stack.Screen name="Location"    component={LocationScreen} />
        <Stack.Screen name="Loading"     component={LoadingScreen} />
        <Stack.Screen name="AccountType" component={AccountTypeScreen} />

        {/* ── Usuario público ── */}
        <Stack.Screen name="Feed"        component={FeedScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="FeedFilter"  component={FeedFilterScreen} />

        {/* ── Registro creador ── */}
        <Stack.Screen name="CreatorStep1"        component={CreatorStep1Screen} />
        <Stack.Screen name="CreatorStep2"        component={CreatorStep2Screen} />
        <Stack.Screen name="CreatorStep3"        component={CreatorStep3Screen} />
        <Stack.Screen name="CreatorStep4"        component={CreatorStep4Screen} />
        <Stack.Screen name="RegistrationPending" component={RegistrationPendingScreen} />
        <Stack.Screen name="AccountApproved"     component={AccountApprovedScreen} />
        <Stack.Screen name="AccountRejected"     component={AccountRejectedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
