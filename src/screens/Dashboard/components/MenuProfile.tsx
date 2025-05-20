import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonComponent } from "../../../components/Button";
import { themes } from "../../../global/themes";
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConnection';
import { useAuth } from '../../../contexts/AuthContext';

type MenuProfileProps = {
  userName: string
  userPhoto: string | null
  showMenuProfile: boolean
  setShowMenuProfile: React.Dispatch<React.SetStateAction<boolean>>
}

const { width, height } = Dimensions.get('window')

export const MenuProfile = ({ userName, userPhoto, showMenuProfile, setShowMenuProfile }: MenuProfileProps) => {
  const [loading, setLoading] = useState(true)
  const { photoUser } = useAuth()

  const handleSignOut = async () => {
    setShowMenuProfile(false)
    await signOut(auth)
  }

  return (
    <Modal visible={showMenuProfile} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>

          <TouchableOpacity onPress={() => setShowMenuProfile(false)} style={{ width:24, marginLeft: 24 }}>
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color="black"
            />
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color={themes.colors.primray} />}
          {userPhoto && (
            <Image
              source={{
                uri: userPhoto!,
                cache: 'force-cache'
              }}
              style={styles.imgProfile}
              alt="profile-photo"
              onLoad={() => setLoading(false)}
            />
          )}

          <View style={styles.containerText}>
            <Text style={[styles.text, {marginBottom: 16}]}>{userName}</Text>
            <Text style={styles.text}>Plano: Básico</Text>
            <Text style={[styles.text, {marginTop: 8}]}>Chats: 13/15</Text>
          </View>

          <View style={styles.diviser}/>

          <View style={styles.containerBtn}>
            <ButtonComponent
              title="Gerenciar plano"
              width={140}
              bgColor={themes.colors.primray}
              onPress={() => null}
            />
            <ButtonComponent
              title="Trocar de conta"
              bgColor='transparent' 
              bordColor='black'
              width={130}
              onPress={() => null}
            />
            <ButtonComponent
              title="Sair"
              bgColor={themes.colors.danger}
              width={110}
              onPress={handleSignOut}
            />
          </View>
          
          <Text style={styles.textVersion}>V 1.0.0</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay:{
    display: 'flex',
    alignItems: 'flex-end',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    position: 'absolute'
  },
  container:{
    width: '55%',
    height: height,
    backgroundColor: 'white',
    paddingTop: '15%',
    paddingBottom: '10%'
  },
  imgProfile:{
    width: 86,
    height: 86,
    borderRadius: 200,
    alignSelf: 'center',
    marginTop: 16
  },
  containerText:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
    paddingLeft: 24
  },
  text:{
    fontSize: 16,
    fontFamily: 'Roboto_400Regular'
  },
  diviser:{
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginTop: 24
  },
  containerBtn:{
    marginTop: 24,
    gap: 16
  },
  textVersion:{
    color: '#807F7F',
    alignSelf: 'center',
    marginTop: 'auto'
  }
})