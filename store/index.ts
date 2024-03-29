import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-logger'

// Import custom components
import rootReducer from '../reducers';


function saveToLocalStorage(state: any = {}) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const serializedState = JSON.stringify(state)
            localStorage.setItem('state', serializedState)
        }
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const serializedState = localStorage.getItem('state')
            if(serializedState === null) return undefined
            return JSON.parse(serializedState)
        }
        return undefined;
    }catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(thunkMiddleware),

    //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
        return f;
    }
));

export type AppDispatch = typeof store.dispatch;

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});

export default store;