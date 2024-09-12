
import { Text,SafeAreaView, Image,  ScrollView, View,StatusBar } from 'react-native';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect,router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isFocused = useIsFocused();
  const { loading, isLogged } = useGlobalContext();
    const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };


  if (!loading && isLogged) return <Redirect href="/home" />;





  return (
    <SafeAreaView className='bg-primary h-full'>
    <StatusBar backgroundColor="#161622"  />

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} >
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
          className='w-[130px] h-[84px]'
          resizeMode='contain'
          source={images.logo} />
          <Image
          className='max-w[380px] w-full h-[250px]'
          resizeMode='contain'
          source={images.cards} />

          <View className='relative mt-2'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with {' '}
            </Text>
            <View className='flex-col items-center '>
            <Text className='text-3xl font-bold text-secondary-200'>Pixi AI</Text>
            <Image source={images.path}
                  className='w-[136px] h-[20px] '
                  resizeMode='contain'/>
          </View>
          </View>
          
          <Text className='text-sm font-pregular text-gray-100 mt-2 text-center'>Where creativity meets innvoation:
            embark on a journey of limitless exploration with Pixi AI
          </Text>
          <CustomButton 
          title="Continue with Email"
          handlePress={()=>router.push('./sign-in')}
          containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


