/* eslint-disable prettier/prettier */
const initialState = {
    isLoggedIn: false,
    user: {},
};

export const loginReducer = (state = initialState, action: any) => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return initialState;
        default: return initialState;
    }
};
