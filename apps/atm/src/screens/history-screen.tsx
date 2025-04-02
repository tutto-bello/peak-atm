import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { RootState } from '../logic/store';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HistoryItem from '../component/history-item';

const HistoryScreen = () => {
  const { history } = useSelector((state: RootState) => state.history);

  const renderHistory = useMemo(
    () =>
      history.length > 0 ? (
        history.map((entry, index) => <HistoryItem key={index} entry={entry} />)
      ) : (
        <Text style={styles.noTransactions}>No transactions recorded.</Text>
      ),
    [history]
  );

  return (
    <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.05)',
            'transparent',
            'transparent',
            'rgba(0,0,0,0.05)',
          ]}
          style={styles.innerShadow}
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {renderHistory}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  shadowContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 24,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: -1,
  },
  scrollView: {
    padding: 8,
    marginVertical: 4,
    paddingBottom: 20,
  },
  noTransactions: {
    textAlign: 'center',
    marginTop: 16,
  },
  title: {
    padding: 24,
  },
});

export default HistoryScreen;
