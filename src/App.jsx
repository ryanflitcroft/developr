import { useState, useEffect } from 'react';
import requestUnsplash from './services/UnsplashService';
import randomNum from './utils/randomNum';
import Layout from './views/Layout/Layout';

const query = window.matchMedia('(prefers-color-scheme: dark)');
query.matches;
query.addEventListener('change', (res) => {
  console.log(res);
  res.matches;
});

export default function App() {
  const [collection, setCollection] = useState([]);
  const [headerImg, setHeaderImg] = useState({});
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(30);

  const defaultQuery = ['Portland', 'Oregon', 'PNW'];

  useEffect(() => {
    async function getdata() {
      setIsLoading(true);
      const collectionData = await requestUnsplash(
        defaultQuery[randomNum(defaultQuery.length)],
        count
      );
      setCollection(collectionData);
      setHeaderImg(collectionData[randomNum(count)]);
      setIsLoading(false);
    }
    getdata();
  }, []);

  return (
    <>
      <Layout
        collection={collection}
        headerImg={headerImg}
        setCollection={setCollection}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        count={count}
      />
    </>
  );
}
