import { Dimensions, Platform } from 'react-native'
import { windowHeight, windowWidth } from '../../common/constants/commonUtils';
import appTheme from "../../common/constants/Theme";
export default {
  registerContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.68,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: appTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",

  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: windowWidth * 0.5,
    marginTop: 25
  }
};