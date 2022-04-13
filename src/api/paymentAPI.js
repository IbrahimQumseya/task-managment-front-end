import axios from './newAPI';

export const getPaymentTokenBrainTree = async () => {
  const res = await axios.get('brain/token');
  return res.data.clientToken;
};
