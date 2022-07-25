import useSWR from 'swr';
import axios from 'axios';
import {HOST_API} from '@env';
const fetcher = (url, token) =>
  axios
    .get(url, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => res.data.data);
const fetcher2 = url => axios.get(url).then(res => res.data.data);
export function GetUser(token) {
  const {data, error} = useSWR([`${HOST_API}/user/info`, token], fetcher, {
    refreshInterval: 1000,
  });
  return {
    user: data,
    loadingUser: !error && !data,
    isError: error,
  };
}
export function GetHistory(token) {
  const {data, error} = useSWR(
    [`${HOST_API}/transaction/history`, token],
    fetcher,
    {
      refreshInterval: 1000,
    },
  );
  return {
    history: data,
    loadingHistory: !error && !data,
    errorHistory: error,
  };
}
export function GetFavProduct() {
  const {data, error} = useSWR([`${HOST_API}/transaction/favorite`], fetcher2);
  return {
    Fav: data,
    loadingFav: !error && !data,
    isError: error,
  };
}
export function GetAllProduct(sort, filter) {
  const {data, error} = useSWR(
    [`${HOST_API}/product/all?order=ASC&sort=name`],
    fetcher2,
  );
  return {
    All: data,
    loadingAll: !error && !data,
    isError: error,
  };
}
export function GetCoffeeProduct(sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?category=07e88ba9-1a54-46ab-bf2c-3dc8831090a4&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    Coffee: data,
    loadingCoffee: !error && !data,
    isError: error,
  };
}
export function GetNonCoffeeProduct(sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?category=30b95dde-a820-41dd-b474-902026e3e755&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    NonCoffee: data,
    loadingNonCoffee: !error && !data,
    isError: error,
  };
}
export function GetFoodsProduct(sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?category=ea71bfcd-f1f1-4976-ae1e-9ff0f2c70d0e&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    Foods: data,
    loadingFoods: !error && !data,
    isError: error,
  };
}
export function GetInfoProduct(id) {
  const {data, error} = useSWR([`${HOST_API}/product/${id}`], fetcher2);
  return {
    product: data,
    loadingProduct: !error && !data,
    isError: error,
  };
}
