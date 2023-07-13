// import React from 'react'
// import ReactDOM from 'react-dom'
// import { getClient } from './graphql/client'
// import { ApolloProvider } from '@apollo/client'
// import { Provider } from 'react-redux'

// import './index.css'
// import App from './App'
// import * as serviceWorker from './serviceWorker'
// import store from './store'

// ReactDOM.render(
//   <ApolloProvider client={getClient(store)}>
//     <Provider store={store}>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </Provider>
//   </ApolloProvider>,
//   document.getElementById('root')
// )

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()

import React from 'react'
import ReactDOM from 'react-dom/client'
import { getClient } from './graphql/client'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals'

import './index.css'
import App from './ui/App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={getClient(store)}>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Provider>
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
