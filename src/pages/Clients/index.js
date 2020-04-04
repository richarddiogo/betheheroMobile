import React , { useState , useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import {View , Text, Image, TouchableOpacity, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Clients() {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    async function loadClients() {
        if (loading) {
            return;
        }

        if (total > 0 && clients.length === total) {
            return;
        }


        setLoading(true)
        const response = await api.get('incidents', {
            params : { page }
        })
        setLoading(false)
        setPage(page + 1)

        setClients([...clients, ...response.data])
        setTotal(response.headers['x-total-count'])
    }

    useEffect(() => {
        loadClients()
    },[])


    function navegateDetail(client) {
        navigation.navigate('Detail', { client });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{ total } Clientes</Text>.    
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um Client</Text>

            <FlatList 
                style={styles.clientList} 
                data={clients}
                keyExtractor={client => String(client.id)}
                onEndReached={loadClients}
                onEndReachedThreshold={0.2}
                renderItem={({item:client})=> (
                    <View style={styles.client}>
                    <Text style={styles.clientProperty}>Client:</Text>
                    <Text style={styles.clientValue}>{client.name}</Text>

                    <Text style={styles.clientProperty}>Caso:</Text>
                    <Text style={styles.clientValue}>{client.title}</Text>

                    <Text style={styles.clientProperty}>Valor:</Text>
                    <Text style={styles.clientValue}>{
                        Intl.NumberFormat('pt-BR',{
                            style: 'currency',
                            currency:'BRL'}
                            ).format(client.value)}
                    </Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navegateDetail(client)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                    </View>
            )}/>

        </View>
    );
}