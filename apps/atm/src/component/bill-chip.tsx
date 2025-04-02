import React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type BillChipProps = {
  denomination: number;
  quantity: number;
  isSelected: boolean;
  onPress: () => void;
};

const BillChip: React.FC<BillChipProps> = ({
  denomination,
  quantity,
  isSelected,
  onPress,
}) => (
  <Chip
    mode={isSelected ? 'flat' : 'outlined'}
    onPress={onPress}
    style={styles.chip}
  >
    {denomination} x {quantity}
  </Chip>
);

const styles = StyleSheet.create({
  chip: {
    marginLeft: 4,
    marginBottom: 4,
  },
});

export default BillChip;
