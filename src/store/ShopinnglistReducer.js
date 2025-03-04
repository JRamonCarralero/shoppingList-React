/**
 * shoppingListReducer
 * 
 * @function
 * @param {Object} state the current state of the shopping list
 * @param {Object} action the action to be performed on the state
 * 
 * @returns {Object} the new state of the shopping list
 * 
 * The reducer handles the following actions:
 *  - CREATE_ITEM: adds an item to the shopping list
 *  - DELETE_ITEM: deletes an item from the shopping list
 *  - UPDATE_ITEM: updates an item in the shopping list
 *  - DELETE_ALL_ITEMS: deletes all items from the shopping list
 *  - LOAD_ITEMS: loads a list of items into the shopping list
 *  - LOGIN: sets the current user in the state
 *  - LOGOUT: sets the current user in the state to null
 *  - default: returns the current state
 */
export default function shoppingListReducer(state, action) {
    switch (action.type) {
        case 'CREATE_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => item._id === action.payload._id ? action.payload : item)
            };
        case 'DELETE_ALL_ITEMS':
            return {
                ...state,
                items: []
            };
        case 'LOAD_ITEMS':
            return {
                ...state,
                items: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                currentUser: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null
            };
        default:
            return state
    }
}