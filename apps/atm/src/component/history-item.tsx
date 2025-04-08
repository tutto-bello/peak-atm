import React from 'react';
import { Text, Chip, Card } from 'react-native-paper';
import { StyleSheet, View, Platform } from 'react-native';
import { formatTime } from '../utils';
import { WithdrawalHistory } from '@peak/shared-types';

const HistoryItem = ({ entry }: { entry: WithdrawalHistory }) => {
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.spaceBetween}>
          <Text>{formatTime(entry.timestamp)}</Text>
          <Text
            style={[
              styles.statusText,
              { color: entry.success ? '#22bb33' : '#ff3333' },
            ]}
          >
            {entry.success ? 'Success' : 'Failure'}
          </Text>
        </View>
        <View style={styles.spaceBetween}>
          <Text style={styles.amount}>Amount: {entry.amount}</Text>
          <View>
            {entry.billsGiven.map((bill, idx) => (
              <Chip key={idx} mode="outlined" style={styles.billChip}>
                {bill.quantity} x {bill.denomination} bill
                {bill.quantity > 1 && 's'}
              </Chip>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    alignItems: 'stretch',
  },
  shadowContainer: {
    flex: 1,
    position: 'relative',
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 1,
  },
  scrollView: {
    padding: 8,
    marginVertical: 4,
  },
  card: {
    marginVertical: 8,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    fontWeight: 'bold',
  },
  amount: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  billChip: {
    marginVertical: 4,
  },
  noTransactions: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default HistoryItem;
