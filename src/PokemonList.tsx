import { atom, useAtom } from 'jotai';
import React from 'react';
import { TextInput, View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

interface Pokemon {
  id: number;
  name: {
    english: string;
  };
  type: string[];
}

const filterAtom = atom<string>('');
const pokemonAtom = atom(async () =>
  fetch(
    'https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json'
  ).then((res) => res.json())
);
const pokemonFilteredAtom = atom<Pokemon[]>((get) =>
  get(pokemonAtom).filter((pokemon) =>
    pokemon.name.english.toLowerCase().includes(get(filterAtom).toLowerCase())
  )
);

const PokemonTable = () => {
  const [pokemon] = useAtom(pokemonFilteredAtom);

  return (
    <ScrollView style={tw`w-full p-4 m-4`}>
      {pokemon.map(({ id, name: { english }, type }) => (
        <View key={id} style={tw`w-full flex-row justify-between`}>
          <Text style={tw`text-white font-black`}>{english}</Text>
          <Text style={tw`text-white`}>{type.join(', ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

function PokemonList() {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <View style={tw`flex-1 justify-start items-center bg-black`}>
      <View style={tw`mt-10 w-full justify-center items-center`}>
        <TextInput
          style={tw`w-3/4 border-white border-2 p-3 rounded-md bg-white`}
          selectionColor="red"
          value={filter}
          onChangeText={setFilter}
        />
        <React.Suspense
          fallback={<Text style={tw`text-white font-black`}>Loading Pokemon data...</Text>}>
          <PokemonTable />
        </React.Suspense>
      </View>
    </View>
  );
}

export default PokemonList;
