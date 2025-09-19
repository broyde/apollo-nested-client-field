const {gql, ApolloClient, InMemoryCache} = require('@apollo/client');
const {LocalState} = require('@apollo/client/local-state');
const {MockLink} = require('@apollo/client/testing');

test('Should resolve nested @client fields properly', async () => {
  const query = gql`
    query {
      child {
        clientField @client
        normalField
      }
    }
  `;

  const cache = new InMemoryCache({
    typePolicies: {
      Child: {
        fields: {
          clientField: {
            read: (value = 1) => {
              console.log('read', value);
              return value;
            },
            merge: (cachedValue, value) => {
              console.log('merge', {cachedValue, value});
              return value;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    link: new MockLink([
      {
        request: {query},
        result: {
          data: {
            __typename: 'Query',
            child: {__typename: 'Child', normalField: 2},
          },
        },
      },
    ]),
    localState: new LocalState(),
    cache,
  });

  const {data} = await client.query({query});
  expect(data.child).toEqual({
    __typename: 'Child',
    clientField: 1,
    normalField: 2,
  });
});
