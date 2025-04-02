import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

type BillControlProps = {
  billAmount: number | undefined;
  onIncrease: () => void;
  onDecrease: () => void;
  onAmountChange: (value: number) => void;
};

const BillControl: React.FC<BillControlProps> = ({
  billAmount,
  onIncrease,
  onDecrease,
  onAmountChange,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Button onPress={onDecrease} mode="contained-tonal" uppercase>
      <Text style={styles.buttonText}>-</Text>
    </Button>
    <TextInput
      keyboardType="numeric"
      value={billAmount ? String(billAmount) : ''}
      onChangeText={(value) => onAmountChange(Number(value))}
      label="Bill number of pieces"
      mode="outlined"
      style={{ marginVertical: 16, minWidth: 150 }}
    />
    <Button onPress={onIncrease} mode="contained-tonal" uppercase>
      <Text style={styles.buttonText}>+</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
  },
});

export default BillControl;
