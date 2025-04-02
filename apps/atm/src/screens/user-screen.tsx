import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { processWithdrawal } from '../logic/withdrawal-slice';
import { addHistory } from '../logic/history-slice';
import { manipulateBill } from '../logic/atm-bills-slice';
import { RootState } from '../logic/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AppDispatch } from '../logic/store';
import { Button, TextInput, Snackbar, Text, Chip } from 'react-native-paper';

const UserScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { keyboardHeight } = useKeyboard();

  // State for amount input and snackbar
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({
    type: 'error' as 'success' | 'error',
    visible: false,
  });

  // Redux store data
  const { error, billsGiven } = useSelector(
    (state: RootState) => state.withdrawal
  );
  const availableBills = useSelector(
    (state: RootState) => state.atmBills.bills
  );

  // Snackbar control
  const showSnackbar = (type: 'success' | 'error') =>
    setSnackbar({ type, visible: true });

  const onDismissSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, visible: false }));

  // Handle withdrawal logic
  const handleWithdrawal = async () => {
    const amountInt = parseInt(amount);
    if (!amountInt || amountInt <= 0) return;

    const result = await dispatch(
      processWithdrawal({ amount: amountInt, availableBills })
    );

    const isSuccess = processWithdrawal.fulfilled.match(result);

    dispatch(
      addHistory({
        timestamp: new Date().toISOString(),
        amount: amountInt,
        success: isSuccess,
        billsGiven: isSuccess ? result.payload.billsGiven : [],
      })
    );

    if (isSuccess) {
      result.payload.billsGiven.forEach((bill) => {
        dispatch(
          manipulateBill({
            denomination: bill.denomination,
            change: -bill.quantity,
          })
        );
      });
      setAmount('');
      showSnackbar('success');
    } else {
      showSnackbar('error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text variant="headlineMedium">Enter withdrawal amount:</Text>
            <TextInput
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              label="Amount"
              mode="outlined"
              style={styles.input}
              error={
                snackbar.type === 'error' &&
                snackbar.visible &&
                amount.length > 0
              }
            />
            <Button mode="contained" onPress={handleWithdrawal} uppercase>
              Withdraw
            </Button>

            {billsGiven.length > 0 && (
              <View style={styles.chipContainer}>
                {billsGiven.map((bill, index) => (
                  <Chip key={index} mode="outlined" style={styles.chip}>
                    {bill.quantity} x {bill.denomination} bill
                    {bill.quantity > 1 && 's'}
                  </Chip>
                ))}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        style={[
          styles.snackbarContainer,
          { bottom: keyboardHeight > 0 ? keyboardHeight - 50 : 20 },
        ]}
      >
        <Snackbar
          visible={snackbar.visible}
          onDismiss={onDismissSnackbar}
          duration={5000}
          action={{
            label: 'Close',
            onPress: () => {},
          }}
        >
          {snackbar.type === 'error'
            ? error || 'Transaction Failed'
            : 'Withdrawal Successful!'}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flexContainer: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'stretch',
  },
  chipContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  input: { marginVertical: 16 },
  snackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginVertical: 16,
  },
});

export default UserScreen;
