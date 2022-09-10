// import { createClient } from '@urql/core';
import { Provider } from 'jotai';
import React from 'react';
// import { Provider } from 'urql';

// import EditUserBase from './src/EditUserBase';
// import DisplayUsers from './src/DisplayUsers';
import PokemonList from './src/PokemonList';

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

const App = () => {
  return (
    // <Provider value={client}>
    //   <EditUserBase />
    // </Provider>
    <Provider>
      <PokemonList />
    </Provider>
    //  <DisplayUsers />
  );
};

export default App;
