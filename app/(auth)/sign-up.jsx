import { useWindowDimensions, View, Text, SafeAreaView, ScrollView, Image, Keyboard, Alert, Platform } from 'react-native'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const [form,setForm] = useState({
    username:'',
    email:'',
    password:'',
   
  })
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  // const { height } = useWindowDimensions();
  // const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const scrollViewRef = useRef(null);

  // useLayoutEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', (e) => {
  //     setKeyboardHeight(e.endCoordinates.height);
  //     setTimeout(() => {
  //       if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
  //         scrollViewRef.current.scrollTo({ x: 0, y: height / 4, animated: true });
  //       }
  //     }, 100);
  //   });
  //   Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardHeight(0);
  //   });
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     Keyboard.dismiss();
  //   };
  // }, []);

  // ...

  return (
      <SafeAreaView className='bg-primary h-full'>

       <ScrollView 
      //  ref={scrollViewRef}
      //  contentContainerStyle={{ paddingBottom: keyboardHeight }} 
       >
            <View className='w-full justify-center px-4 my-6'>
              <Image className='w-[115px] h-[35px]' style={Platform.OS === 'android' ? { marginTop: 30 } : {}} source={images.logo} resizeMode='contain'/>
              <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Pixi AI</Text>
              <FormField
              title='Username'
              value={form.username}
              handleChangeText={(e)=>setForm({...form,username:e})}
              otherStyles='mt-10'
              />
              <FormField
              title='Email'
              value={form.email}
              handleChangeText={(e)=>setForm({...form,email:e})}
              otherStyles='mt-7'
              keyboardType='email-address'//autofill
              />
              <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e)=>setForm({...form,password:e})}
              otherStyles='mt-7'
              />
              <CustomButton
                title="Sign Up"
                handlePress={submit}
                containerStyles='mt-7'
                isLoading={isSubmitting}
              />
              <View className='justify-center pt-5 flex-row gap-2'>
                <Text className='text-lg text-gray-100 font-pregular'>
                  Have An Account?
                </Text>
                <Link href='/sign-in' className='text-lg font-psemibold text-secondary-100'>Sign In</Link>
                <Text></Text>
              </View>
            </View>
          </ScrollView>


      </SafeAreaView>
  )
}

export default SignUp