import React from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axios from '../../../api/newAPI';

export default class BrainTreePaymentTest extends React.Component {
  instance;

  state = {
    clientToken: null,
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    const response = await axios.get('/brain/token');
    const clientToken = await response.data.clientToken; // If returned as JSON string

    this.setState({
      clientToken,
    });
  }

  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();
    await axios.post(`/brain/charge`, {
      amount: '2',
      paymentMethodId: nonce,
    });
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}
