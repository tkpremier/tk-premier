import React from 'react';
import Switch from '@material-ui/core/Switch';

class Switches extends React.Component {
  state = {
    active: this.props.value
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.active}
          onChange={this.handleChange('active')}
          value="active"
        />
      </div>
    );
  }
}

export default Switches;