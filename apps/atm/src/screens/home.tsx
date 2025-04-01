import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { setAmount, processWithdrawal } from '../logic/withdrawal-slice';
import { addHistory } from '../logic/history-slice';
import { manipulateBill } from '../logic/atm-bills-slice';
import { RootState } from '../logic/store';

const Home = () => {
  const dispatch = useDispatch();
  const [amount, setAmountInput] = useState('');
  const {
    amount: withdrawalAmount,
    success,
    error,
    billsGiven,
  } = useSelector((state: RootState) => state.withdrawal);
  const availableBills = useSelector(
    (state: RootState) => state.atmBills.bills
  );

  const handleWithdrawal = () => {
    const amountInt = parseInt(amount);
    if (!amountInt || amountInt <= 0) return;

    dispatch(setAmount(amountInt));
    dispatch(processWithdrawal({ amount: amountInt, availableBills }));

    if (success) {
      // Update bill quantities
      billsGiven.forEach((bill) => {
        dispatch(
          manipulateBill({
            denomination: bill.denomination,
            change: -bill.quantity,
          })
        );
      });

      // Log the successful withdrawal to history
      dispatch(
        addHistory({
          timestamp: new Date().toISOString(),
          amount: amountInt,
          success: true,
          billsGiven,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter withdrawal amount:</Text>
      <TextInput
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmountInput}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Submit" onPress={handleWithdrawal} />
      {success && <Text>Withdrawal Successful!</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;
