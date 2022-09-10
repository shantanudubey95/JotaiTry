import React from 'react';
import { Text, TextInput, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useMutation } from 'urql';

const MutationQuery = `
mutation MyMutation {
    update_Users(where: {id: {_eq: "f121da6c-0caf-4f63-88a0-5c4c0fd3df82"}}, _set: {age: "37"}) {
      returning {
        age
        id
        last_name
        first_name
      }
    }
  }
`;

const EditUserBase = () => {
  //   const [first_name, setFirst_name] = React.useState('');
  //   const [last_name, setLast_name] = React.useState('');
  const [age, setAge] = React.useState('');
  const [result, updateUsers] = useMutation(MutationQuery);

  if (result.error) return <Text>Something went wrong while toggling</Text>;
  //   const Update = ({ id, first_name }) => {
  //     const [update_UsersResult, update_Users] = useMutation(MutationQuery);
  //   };

  //   const addDetails = (newUser) => {
  //     const variables = { id, title: newUser || '' };
  //     update_Users(variables).then((result) => {
  //       if (result.error) {
  //         console.error('Oh no!', result.error);
  //       }
  //     });
  //   };
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
      {/* <TextInput
        placeholder="Enter first name"
        style={tw`p-3 w-3/4 border-2 rounded-md`}
        value={first_name}
        onChangeText={setFirst_name}
      />
      <TextInput
        placeholder="Enter last name"
        style={tw`p-3 w-3/4 border-2 rounded-md`}
        value={last_name}
        onChangeText={setLast_name}
      /> */}
      <TextInput
        placeholder="Enter age"
        style={tw`p-3 w-3/4 border-2 rounded-md`}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Edit age" color="red" />
      <Button title="Fetch data" color="purple" />
      <Text>EditUserBase</Text>
    </ScrollView>
  );
};

export default EditUserBase;
