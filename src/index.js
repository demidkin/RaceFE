import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ContractInstance from './contract';


function storeAction(state = [], action){
    if (action.type === 'WITHDRAW'){

        ContractInstance.withdraw((err, result) => {
            console.log(result);
            console.log(err);
        });
        return [
            ...state,
            action.payload
        ]
    }
    return state;
}

const store = createStore(storeAction);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
