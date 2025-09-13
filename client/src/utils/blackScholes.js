import { erf, sqrt, exp, log } from 'mathjs';

// Standard Normal CDF
export const normCDF = (x) => 0.5 * (1 + erf(x / Math.sqrt(2)));

// Black-Scholes price
export const blackScholesPrice = ({ S, K, T, r, sigma, type }) => {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  if (type === 'call') {
    return S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
  } else {
    return K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
  }
};

// Greeks
export const blackScholesGreeks = ({ S, K, T, r, sigma, type }) => {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const delta = type === 'call' ? normCDF(d1) : normCDF(d1) - 1;
  const theta = type === 'call'
    ? (- (S * sigma * Math.exp(-0.5*d1*d1)/sqrt(2*Math.PI)) / (2*Math.sqrt(T)) - r*K*Math.exp(-r*T)*normCDF(d2))
    : (- (S * sigma * Math.exp(-0.5*d1*d1)/sqrt(2*Math.PI)) / (2*Math.sqrt(T)) + r*K*Math.exp(-r*T)*normCDF(-d2));
  const vega = S * Math.exp(-0.5*d1*d1)/sqrt(2*Math.PI) * Math.sqrt(T);

  return { delta, theta, vega };
};
