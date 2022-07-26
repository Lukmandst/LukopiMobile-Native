import useSWR from 'swr';
import axios from 'axios';
import {HOST_API} from '@env';
const fetcher = (url, token) =>
  axios
    .get(url, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => res.data.data);
const fetcher2 = url => axios.get(url).then(res => res.data);
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
export function GetFavProduct(name) {
  const {data, error} = useSWR(
    [`${HOST_API}/transaction/favorite?name=${name}`],
    fetcher2,
  );
  return {
    Fav: data?.data,
    loadingFav: !error && !data,
    isError: error,
  };
}
export function GetAllProduct(name, sort, filter, limit = 5) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?name=${name}&order=${sort}&sort=${filter}&limit=${limit}`,
    ],
    fetcher2,
  );
  return {
    All: data?.data,
    AllMeta: data?.meta,
    loadingAll: !error && !data,
    isError: error,
  };
}
export function GetCoffeeProduct(name, sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?name=${name}&category=coffee&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    Coffee: data?.data,
    CoffeeMeta: data?.meta,
    loadingCoffee: !error && !data,
    isError: error,
  };
}
export function GetNonCoffeeProduct(name, sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?name=${name}&category=non%20coffee&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    NonCoffee: data?.data,
    NonMeta: data?.meta,
    loadingNonCoffee: !error && !data,
    isError: error,
  };
}
export function GetFoodsProduct(name, sort, filter) {
  const {data, error} = useSWR(
    [
      `${HOST_API}/product?name=${name}&category=foods&order=${sort}&sort=${filter}`,
    ],
    fetcher2,
  );
  return {
    Foods: data?.data,
    FoodsMeta: data?.meta,
    loadingFoods: !error && !data,
    isError: error,
  };
}
export function GetInfoProduct(id) {
  const {data, error} = useSWR([`${HOST_API}/product/${id}`], fetcher2);
  return {
    product: data?.data,
    loadingProduct: !error && !data,
    isError: error,
  };
}
export function GetSales() {
  const {data, error} = useSWR([`${HOST_API}/transaction/all`], fetcher2);
  return {
    sales: data?.data,
    loadingsales: !error && !data,
    isError: error,
  };
}
