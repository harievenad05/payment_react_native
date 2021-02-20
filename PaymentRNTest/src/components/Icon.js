import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

class FTIcon extends React.Component {
  state = {
    fontLoaded: false,
  };

  render() {
    const {name, color, ...rest} = this.props;

    if (name && color) {
      return <Icon name={name} color={color ? color : '#8898AA'} {...rest} />;
    }

    return null;
  }
}

export default FTIcon;
