import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import {View , Text, Image, TouchableOpacity, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Details() {
  const navigation = useNavigation();
  const message = `Olá ${client.value}`

  const route = useRoute()
  const client = route.params.client;

  function navegateBack() {
      navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Olá ${client.name}`,
      recipients: ['richard.emp@gmail.com'],
      body: message
    })
  }

  function sendWhatsap() {
    Linking.openURL(`whatsapp://send?phone=5511954322252&text=${message}`)
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <Image source={logoImg} />

          <TouchableOpacity 
          style={styles.a} 
          onPress={navegateBack}>
              <Feather name="arrow-left" size={16} color="#E02041"/>
          </TouchableOpacity>
       </View>

       <View style={styles.client}>
          <Text style={[styles.clientProperty,{marginTop:0}]}>Client:</Text>
          <Text style={styles.clientValue}>{client.name} de {client.city}/{client.uf}</Text>

          <Text style={styles.clientProperty}>Caso:</Text>
          <Text style={styles.clientValue}>{client.title}</Text>

          <Text style={styles.clientProperty}>Valor:</Text>
          <Text style={styles.clientValue}> {
              Intl.NumberFormat('pt-BR',{
              style: 'currency',
              currency:'BRL'}
              ).format(client.value)}</Text>
       </View>

       <View style={styles.contactBox}>
          <Text style={styles.clientTitle}>Atender</Text>
          <Text style={styles.clientTitle}>Cliente do SysDente</Text>

          <Text style={styles.clientDescription}>Entre em contato</Text>

          <View style={styles.actions}>
              <TouchableOpacity 
              style={styles.action} 
              onPress={sendWhatsap}>
                    <Text style={styles.actionText}>Whatsapp</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={styles.action} 
              onPress={sendEmail}>
                    <Text style={styles.actionText}>E-mail</Text>
              </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}