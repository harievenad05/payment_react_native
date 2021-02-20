import { Dimensions, Platform } from 'react-native'
import appTheme from "../../common/constants/Theme";
export default {
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.COLORS.PRIMARY,
  },
  logo: {
    height: 120,
    marginBottom: 80,
    width: Dimensions.get('screen').width - 40,
    resizeMode: 'contain',
  },
  textstyle: {
    fontSize: 18,
    color: appTheme.COLORS.WHITE,
    marginTop: 20,
  }
};