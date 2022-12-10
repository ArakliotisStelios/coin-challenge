export const fetchCoins = async (args) => {
  const page = args.queryKey[1];
  const perPage = args.queryKey[2];
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    { mode: "cors" }
  );
  return res.json();
};

export const fetchCoinDetails = async (args) => {
  const coinId = args.queryKey[1];
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
    mode: "cors",
  });
  return res.json();
};

export const fetchCoinMarketChart = async (args) => {
  const coinId = args.queryKey[1];
  const days = args.queryKey[2];
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    { mode: "cors" }
  );
  return res.json();
};
