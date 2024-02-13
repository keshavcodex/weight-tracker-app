import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import themeModal from '../theme/theme';

const CustomInput = (props: any) => {
  const {label, value, setValue} = props;
  const theme = themeModal();
  return (
    <TextInput
      label={label}
      mode="outlined"
      value={value}
      outlineColor={theme.main}
      activeOutlineColor={theme.skyBlue}
      onChangeText={text => setValue(text)}
      style={{marginBottom: 10}}
    />
  );
};

export default CustomInput;
