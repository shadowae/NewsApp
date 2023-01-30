import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, FlatList, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import SearchBar from "./SearchBar";
import List from "./List";

export default function App() {
  const apiKey = '05d95baf9e3a430c9d4afdf68efb75d9'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const getMovies = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchPhrase}`);
      const json = await response.json();
      setData(json.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearchPhraseChange = event => {
  //   setSearchPhrase(event.target.value);
  //   useCallback(
  //     debounce(getMovies, 200),
  //     []
  //   );
  // };

  useEffect(() => {
    getMovies();
  }, [searchPhrase]);

  return (
    <View style={styles.main}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (<List
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {flex: 1, padding: 24},
  item: {
    margin: 0,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
});
