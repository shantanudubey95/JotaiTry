/* eslint-disable @typescript-eslint/no-unused-vars */
// // import { atom, Provider, useAtom } from 'jotai';
// // import { StyleSheet, Text, TextInput, View } from 'react-native';

// // const pokemonAtom = atom([]);
// // const filterAtom = '';

// // function FilterInput() {
// //   const [filter, setFilter] = useAtom(filterAtom);
// //   return <TextInput value={filter} onChangeText={setFilter} />;
// // }

// // function App() {
// //   const [filter] = useAtom(filterAtom);
// //   return (
// //     <View style={styles.container}>
// //       <FilterInput />
// //     </View>
// //   );
// // }

// // export default () => (
// //   <Provider>
// //     <App />
// //   </Provider>
// // );

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// // import { atom, Provider, useAtom } from 'jotai';
// import { atom, useAtom } from 'jotai';
// import React from 'react';
// import { View, Text } from 'react-native';

// const priceAtom = atom(10);
// const messageAtom = atom('hello');
// const productAtom = atom({ id: 12, name: 'good stuff' });
// const readOnlyAtom = atom((get) => get(priceAtom) * 2);

// const writeOnlyAtom = atom(
//   null, // it's a convention to pass `null` for the first argument
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(priceAtom, get(priceAtom) - 10);
//   }
// );
// const readWriteAtom = atom(
//   (get) => get(priceAtom) * 2,
//   (get, set, newPrice) => {
//     set(priceAtom, newPrice / 2);
//     // you can set as many atoms as you want at the same time
//   }
// );
// console.log('Answer', writeOnlyAtom);
// const Pokemon = () => {
//   const [read, setRead] = useAtom(readWriteAtom);
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text
//         onPress={() => {
//           setRead(50);
//         }}
//         style={{ fontSize: 40 }}>
//         {read}
//       </Text>
//     </View>
//   );
// };

// export default Pokemon;

// import { atom, useAtom } from 'jotai';
// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const counterAtom = atom(70);

// export function Pokemon() {
//   const [count, setCount] = useAtom(counterAtom);
//   const handleClick = () => {
//     setCount(count + 1); // Increment number
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>{count}</Text>
//       <Button onPress={handleClick} title="Increment"/>
//     </View>
//   );
// }

import { createClient } from '@urql/core';
import { atom, useAtom } from 'jotai';
import { atomWithQuery } from 'jotai/urql';
import React from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import tw from 'twrnc';
import { useQuery, useMutation } from 'urql';

// const client = createClient({
//   url: 'https://adapting-fawn-25.hasura.app/v1/graphql',
//   fetchOptions: () => {
//     return {
//       headers: {
//         'X-Hasura-Admin-Secret': 'HpkCbOkfo2h3STiwgqqEi3pmfcr5etYNvVFFMR1E10X4IdNbupsMpZgQ3f5Xo44T',
//       },
//     };
//   },
// });

const users = atom(5);

// const queryAtom = atomWithQuery(
//     (get) => ({
//         query: `query PokemonsQuery($limit: Int, $offset: Int) {
//         pokemons(limit: $limit, offset: $offset) {
//           results {
//             name
//             image
//           }
//         }
//       }`,
//         variables: { limit: get(users), offset: 0 },
//     }),
//     () => client,
// )

const UsersQuery = `
query MyQuery {
    Users {
      age
      first_name
      id
      last_name
    }
  }
`;

export default function Pokemon() {
  const [result] = useQuery({ query: UsersQuery });

  const [name, setName] = React.useState('');

  const [data, editUser] = useMutation(`
  mutation MyMutation {
    update_Users(where: {id: {_eq: "f121da6c-0caf-4f63-88a0-5c4c0fd3df82"}}, _set: {age: "337"}) {
      returning {
        age
        id
        last_name
        first_name
      }
    }
  }
`);

  // const handleSubmit = () => {
  //   editUser({ age }).then(({ data }) => {
  //     console.log(users);
  //     if (data.editUser) {
  //     }
  //   });
  // };

  if (result.fetching) return <Text>Loading...</Text>;
  if (result.error)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Oh no... {result.error.message}</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput style={tw`w-3/4 h-8 border-2`} onChangeText={setName} value={name} />
      <Button disabled={result.fetching} title="Submit" />
      {result.data.Users.map(({ id, age, first_name, last_name }) => (
        <Text style={tw`mt-4`} key={id}>
          {first_name} {last_name} {age}
        </Text>
      ))}
    </View>
  );
}
