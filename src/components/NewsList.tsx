import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import NewsItem from './NewsItem';

export default function NewsList({ data }: any) {
  return (
    <FlatList
      contentContainerStyle={styles.scrollContent}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <NewsItem
          title={item.title}
          image={item.image}
          published={item.published}
          link={item.link}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
});