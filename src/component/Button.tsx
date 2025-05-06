import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title = 'Button',
  rightComponent,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnBg,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.btnRow}>
        <Text style={[styles.btnText, disabled && styles.disabledText]}>
          {title}
        </Text>
        {rightComponent && (
          <View style={styles.rightBox}>{rightComponent}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 30,
    height: 60,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: '#A5D6B8', 
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  disabledText: {
    color: '#e0e0e0',
  },
  rightBox: {
    backgroundColor: '#489E67',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
