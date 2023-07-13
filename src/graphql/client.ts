import { split, HttpLink, ApolloLink, from } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import _debug from 'debug'
const debug = _debug('graphql')

const createErrorLink = (store: any) => {
  return onError(({ graphQLErrors, networkError }) => {
    // A graphQlError does not mean that the full request failed, but that
    // at least one field failed.
    // Each query must independently look at the errors returned in addition
    // to the returned fields.
    if (graphQLErrors) {
      graphQLErrors.forEach(error => {
        debug(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
        )
        store.dispatch({ type: '@@apollo/QUERY_ERROR', payload: error })
      })
    }

    // Network errors can also be errors in the routing middleware
    // status and response are not always defined
    if (networkError) {
      debug(`[Network error]: ${networkError}`)
      if (graphQLErrors && graphQLErrors.length === 1) {
        return store.dispatch({
          type: '@@apollo/NETWORK_ERROR',
          payload: graphQLErrors[0]
        })
      }
    }
  })
}

/**
 * This will hook into the GraphQL client and dispatch a redux action for each query result.
 * @param {*} store
 */
const createLoggerLink = (store: any) => {
  return new ApolloLink((operation, forward) => {
    const results = forward(operation)
    // This tracks the operation of subscribing to a GraphQL subscription.
    if ((operation.query.definitions[0] as any).operation === 'subscription') {
      store.dispatch({
        type: '@@apollo/SUBSCRIPTION_SUCCESS',
        payload: { operationName: operation.operationName }
      })
      return results
    } else if ((operation.query.definitions[0] as any).operation === 'query') {
      store.dispatch({
        type: '@@apollo/QUERY_INIT',
        payload: { operationName: operation.operationName }
      })
    }

    return results.map(result => {
      // The dispatch does not mean that the query was 100% successful, some errors might be contained
      // in the result as errors are raised per-fields.
      store.dispatch({
        type: '@@apollo/QUERY_RESULT',
        payload: { operationName: operation.operationName, result }
      })
      return result
    })
  })
}

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/graphql`,
  options: {
    reconnect: true
  }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const createClient = (store: any) => {
  const loggerLink = createLoggerLink(store)
  const errorLink = createErrorLink(store)

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: true,
      dataIdFromObject: (result: any) => {
        if (result && result.id && result.__typename) {
          // The activities are an union between organization events and project events.
          // So we add the type of the event to the id to create unique ids in Apollo cache.
          // if (result.__typename === 'Query') {
          //   return result.__typename + result.type + result.id
          // }
          // if (result.__typename === 'backer') {
          //   return (
          //     result.__typename +
          //     result.type +
          //     result.id +
          //     '_p' +
          //     result.projectId
          //   )
          // }
          // if (result.__typename === 'feed') {
          //   return result.__typename + result.type + result.id
          // }
          return result.__typename + result.id
        }

        // Make sure to return null if this object doesn't have an ID
        return null
      }
    }),
    link: from([loggerLink, errorLink, splitLink])
  })
}

let clientInstance: any

export const getClient = (store?: any) => {
  if (!clientInstance && store) {
    clientInstance = createClient(store)
  }
  return clientInstance
}
