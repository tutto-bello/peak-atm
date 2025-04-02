import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateBill } from '../logic/atm-bills-slice';
import { Button, Text, Snackbar, Divider } from 'react-native-paper';
import { RootState } from '../logic/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BillChip from '../component/bill-chip';
import BillControl from '../component/bill-control';
import { useKeyboard } from '@react-native-community/hooks';

const OperatorScreen = () => {
  const [billAmount, setBillAmount] = useState<number | undefined>(undefined);
  const [denomination, setDenomination] = useState(20000);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboard();
  const { bills } = useSelector((state: RootState) => state.atmBills);

  const handleManipulateBills = useCallback(
    (change: number) => {
      if (!billAmount || billAmount <= 0) {
        setSnackbar({ visible: true, message: 'Invalid bill amount' });
        return;
      }
      dispatch(manipulateBill({ denomination, change: change * billAmount }));
      setBillAmount(undefined);
      Keyboard.dismiss();
      setSnackbar({ visible: true, message: 'Bills updated successfully' });
    },
    [billAmount, denomination, dispatch]
  );

  const handleIncrease = useCallback(() => {
    setBillAmount((prev) => (prev ? prev + 1 : 1));
  }, []);

  const handleDecrease = useCallback(() => {
    setBillAmount((prev) => (prev && prev > 1 ? prev - 1 : undefined));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text variant="headlineSmall">ATM Bills</Text>

            <View style={styles.chipContainer}>
              {bills.map((bill) => (
                <BillChip
                  key={bill.denomination}
                  denomination={bill.denomination}
                  quantity={bill.quantity}
                  isSelected={denomination === bill.denomination}
                  onPress={() => setDenomination(bill.denomination)}
                />
              ))}
            </View>

            <Divider style={styles.divider} />

            <Text variant="headlineSmall">Manage Bills</Text>
            <BillControl
              billAmount={billAmount}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onAmountChange={setBillAmount}
            />

            <Button mode="contained" onPress={() => handleManipulateBills(1)}>
              Add Bills
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleManipulateBills(-1)}
              style={styles.removeButton}
            >
              Remove Bills
            </Button>

            <View
              style={[
                styles.snackbarContainer,
                { bottom: keyboardHeight > 0 ? keyboardHeight - 140 : 20 },
              ]}
            >
              <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
                duration={3000}
              >
                {snackbar.message}
              </Snackbar>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 0 : -40 },
  container: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    alignItems: 'stretch',
    flex: 1,
  },
  flexContainer: { flex: 1 },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  divider: {
    marginVertical: 12,
  },
  removeButton: {
    marginTop: 8,
  },
  snackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginVertical: 16,
  },
});

export default OperatorScreen;
