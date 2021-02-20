import React, {Component} from 'react';
import AwesomeLoading from 'react-native-awesome-loading';

export default class Loader extends Component {
  render() {
    const {isLoader} = this.props;
    return (
      <>
        <AwesomeLoading
          istransparent={true}
          indicatorId={17}
          size={50}
          isActive={this.props.loading}
          text="loading"
        />
      </>

      // </Modal>
    );
  }
}
