import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useQuery } from 'urql';

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

export default function DisplayUsers() {
  const [result] = useQuery({ query: UsersQuery });

  if (result.fetching) return <Text>Loading...</Text>;
  if (result.error)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Oh no... {result.error.message}</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {result.data.Users.map(({ id, age, first_name, last_name }) => (
        <Text style={tw`mt-4`} key={id}>
          {first_name} {last_name} {age}
        </Text>
      ))}
    </View>
  );
}
