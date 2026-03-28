import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Button,
} from 'react-native';

import { fetchNewsService, NewsData } from './src/utils/handle-api';
import NewsList from './src/components/NewsList';

export default function App() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNewsService();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao obter notícias');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('./tasks/images/newspaper-banner.png')}
          style={styles.banner}
        />
        <Text style={styles.headerTitle}>Últimas notícias</Text>
      </View>

      {/* CONTADOR */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Total de notícias: {newsList.length}
        </Text>

        <Button title="Atualizar" onPress={fetchNews} />
      </View>
      
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (
        <NewsList data={newsList} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    paddingTop: 40,
  },

  banner: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },

  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  errorText: {
    color: 'red',
    fontSize: 16,
  },
});