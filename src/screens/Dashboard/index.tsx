import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonComponent } from '../../components/Button';
import Loading from '../../components/Loading';
import { styleShadow } from '../../global/shadow';
import { themes } from '../../global/themes';
import { MenuProfile } from './components/MenuProfile';
import { Chats } from './components/Chats';
import { Plans } from './components/Plans';
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { auth, storage } from '../../firebaseConnection';
import { useAuth } from '../../contexts/AuthContext';
import { useVerse } from '../../contexts/DailyVerseContext';
import { navigate } from '../../utils/navigationService';

const { width } = Dimensions.get("window")

type verseFormattedProps = {
  verse: string
  reference: string
}

export function Dashboard(){
  const [userName, setUserName] = useState<string | null>(null)
  const [photoUser, setPhotoUser] = useState<string | null>(null)
  const [uploadImageUri, setUploadImageUri] = useState<string | null>(null)
  const [buttonSelected, setButtonSelected] = useState<'plans' | 'chats'>('plans')
  const [showMenuProfile, setShowMenuProfile] = useState<boolean>(false)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Roboto_400Regular,
    Roboto_700Bold
  })
  const [verseFormatted, setVerseFormatted] = useState<verseFormattedProps>({
    verse: '',
    reference: ''
  })
  const { currentUser } = auth
  const { verse } = useVerse()

  const now = new Date();
  const today = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`; 
  now.setMinutes(now.getMinutes() + 1)  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName)
        setPhotoUser(user.photoURL)
        const partsVerse = verse?.split(' - ')
        if(partsVerse) setVerseFormatted({ verse: partsVerse[0].replace(/(^"|"$)/g, ''), reference: partsVerse[1] })
      }
    });

    return () => unsubscribe();
  }, [verse])

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadImageUri(result.assets[0].uri)
      uploadProfilePicture(result.assets[0].uri)
    }
  }

  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob;
  }

  const uploadProfilePicture = async (uri: string) => {
    if (!currentUser) return { error: "Usuário não autenticado" }
    try {
      const userId = currentUser.uid
      const fileRef = ref(storage, `profilePictures/${userId}`)
  
      const blob = await uriToBlob(uri)
      const snapshot = await uploadBytes(fileRef, blob)
      const photoURL = await getDownloadURL(snapshot.ref)
  
      await updateProfile(currentUser, { photoURL })
      await auth.currentUser?.reload()
      if(auth.currentUser) setPhotoUser(auth.currentUser.photoURL)
      navigate('dashboard')
  
      return { success: true, photoURL }
    } catch (error) {
      return { error: "Erro ao enviar a foto" }
    }
  }

  const changeSection = () => {
    setButtonSelected((prev) => prev === 'chats' ? 'plans' :'chats')
  }

  if(!userName || !fontsLoaded){
    return <Loading/>
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/biblia.ai.logo.png')} 
          style={styleScaled.img_logo}
        />
        <Text style={styleScaled.title}>Biblia.AI</Text>
      </View>

      <MenuProfile 
        userName={userName}
        userPhoto={photoUser}
        setShowMenuProfile={setShowMenuProfile}
        showMenuProfile={showMenuProfile}
      />

      <View style={styles.containerShowUser}>
        <Text style={styleScaled.title} numberOfLines={1}>Olá, {userName}!</Text>
        {photoUser ? (
          <TouchableOpacity onPress={() => setShowMenuProfile(true)}>
            <Image
              source={{ uri: photoUser }}
              style={styleScaled.selectImage}
              alt="profile-photo"
            />
          </TouchableOpacity>
        ) : (
          uploadImageUri ? (
            <Image 
              source={{ uri: uploadImageUri }}
              style={styleScaled.selectImage}
            />
          ) : (
            <View style={styleScaled.selectImage} onTouchStart={pickImage}>
              <AntDesign name="user" size={32} color="black" />
            </View>
          )
        )}
      </View>
      <View style={[ styles.containerMessage, styleShadow.shadow ]}>
        <Text style={styleScaled.titleMessage}>Mensagem do dia</Text>
        <Text style={styleScaled.messagesProps}>{verseFormatted.verse}</Text>
        <View style={styles.footerMessage}>
          <Text style={styleScaled.book}>{verseFormatted.reference}</Text>
          <Text style={styleScaled.messagesProps}>{today}</Text>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <ButtonComponent 
          title='Planos de estudos' 
          width={moderateScale(width > 375 ? 160 : 130)}
          bgColor={buttonSelected === 'plans' ? themes.colors.tertiary : 'white'}
          onPress={changeSection}
        />
        <ButtonComponent 
          title='Conversas' 
          width={moderateScale(width > 375 ? 120 : 100)}
          bgColor={buttonSelected === 'chats' ? themes.colors.tertiary : 'white'}
          onPress={changeSection}
        />
      </View>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={() => navigate('planApp')}>
        <Text>Ir para planos</Text>
      </TouchableOpacity>

      {buttonSelected === 'chats' ? (
        <Chats/>
      ) : (
        <Plans/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
    marginTop: 56
  },
  containerShowUser:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerMessage:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    marginTop: 32,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 16
  },
  footerMessage:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerBtn:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 48,
  }
})

const styleScaled = ScaledSheet.create({
  img_logo:{
    width: moderateScale(width > 375 ? 54 : 45),
    height: moderateScale(width > 375 ? 54 : 45),
    borderRadius: '100%'
  },
  title:{
    width: '85%',
    fontFamily: 'Poppins_700Bold',
    fontSize: moderateScale(width > 375 ? 32 : 24)
  },
  selectImage:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: moderateScale(width > 375 ? 40 : 35),
    height: moderateScale(width > 375 ? 40 : 35),
    borderRadius: '100%',
    backgroundColor: '#ddd'
  },
  titleMessage:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 20 : 16),
    textAlign: 'center'
  },
  messagesProps:{
    fontSize: moderateScale(width > 375 ? 18 : 14),
    fontFamily: 'Roboto_400Regular'
  },
  book:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 18 : 16),
  },
})