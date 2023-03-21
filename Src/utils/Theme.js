import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const dh = Dimensions.get('screen').height;
const dw = Dimensions.get('screen').width;

export default Theme = {
  wp,
  hp,
  dh,
  dw,
  RFPercentage,
  RFValue,
  borderColor: '#5096ED',
  greyColor: '#828282',
  primaryColor: '#557089',
};
