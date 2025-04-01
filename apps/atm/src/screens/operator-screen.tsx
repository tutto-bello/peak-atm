import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateBill } from '../logic/atm-bills-slice';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RootState } from '../logic/store';

const OperatorScreen = () => {
  const [billAmount, setBillAmount] = useState('');
  const [denomination, setDenomination] = useState(20000);
  const dispatch = useDispatch();
  const { history } = useSelector((state: RootState) => state.history);
  const { bills } = useSelector((state: RootState) => state.atmBills);

  const handleManipulateBills = (change: number) => {
    const billInt = parseInt(billAmount);
    if (!billInt || billInt <= 0) return;

    dispatch(
      manipulateBill({
        denomination,
        change: change * billInt,
      })
    );
  };

  return (
    <View>
      {bills.map((bill, index) => (
        <View key={index}>
          <Text>
            {bill.denomination} x {bill.quantity}
          </Text>
        </View>
      ))}

      <Text>History</Text>
      {history.map((entry, index) => (
        <View key={index}>
          <Text>
            {entry.timestamp} - {entry.success ? 'Success' : 'Failure'}
          </Text>
          <Text>Amount: {entry.amount}</Text>
          <Text>{entry.timestamp}</Text>
          {entry.billsGiven.map((bill, index) => (
            <Text key={index}>
              {bill.denomination} x {bill.quantity}
            </Text>
          ))}
        </View>
      ))}

      {bills.map((bill) => (
        <TouchableOpacity
          key={bill.denomination}
          style={{
            padding: 10,
            backgroundColor:
              denomination === bill.denomination ? 'blue' : 'lightgray',
            margin: 5,
          }}
          onPress={() => setDenomination(bill.denomination)}
        >
          <Text>{bill.denomination}</Text>
        </TouchableOpacity>
      ))}
      <TextInput
        keyboardType="numeric"
        value={billAmount}
        onChangeText={setBillAmount}
        style={styles.input}
      />
      <Button title="Add Bills" onPress={() => handleManipulateBills(1)} />
      <Button title="Remove Bills" onPress={() => handleManipulateBills(-1)} />
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
  input: { height: 40, borderColor: 'gray', borderWidth: 1 },
});

export default OperatorScreen;
