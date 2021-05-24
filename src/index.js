import React from 'react'; //  импорт реакта
import ReactDOM from 'react-dom'; // импорт реакт дома
import './index.css'; // стили
import App from './App'; // компонент апп
import reportWebVitals from './reportWebVitals'; //////////////////////
import { BrowserRouter } from 'react-router-dom'; // роутинг
import { compose, createStore, applyMiddleware } from 'redux' // модификации для редакса
import { Provider } from 'react-redux'; // библиотека для свзяи редакса и реакта
import rootReducer from './store/reducers/rootReducer'; // Все редьюсеры
import thunk from 'redux-thunk' // Библиотека для асинхронных запрососв в редаксе 

// Подлючение девтулса редакса
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

// Редаксовский стор
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render( 
  <React.StrictMode>
    <Provider store={store}> {/* Закидываем в контекст наш редакс */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
