import {
    USER_FETCH_REQUESTED, USER_FETCH_FAILED, USER_FETCH_SUCCEEDED,
    DELETE_USER, DELETE_USER_FAILED, DELETE_USER_SUCCESSED,
    CREATE_USER, CREATE_USER_SUCCESSED, CREATE_USER_FAILED,
    EDIT_USER, EDIT_USER_SUCCESSED, EDIT_USER_FAILED
} from "../action/action";

const intialstate = {
    user: [],
    error: null,
    loading: false
}

const reducer = (state = intialstate, action) => {
    switch (action.type) {
        case USER_FETCH_REQUESTED: {
            return { ...state, loading: true, error: null };
        }

        case USER_FETCH_SUCCEEDED: {
            console.log("action", action.user);
            return { ...state, user: action.user, loading: false };
        }

        case USER_FETCH_FAILED:
            console.log("message", action.message);
            return { ...state, loading: false, error: action.message };

        case DELETE_USER: {
            return { ...state, loading: true, error: null };
        }
        case DELETE_USER_SUCCESSED:
            console.log(state.user.splice(action.user, 1));
            return { ...state, user: state.user.splice(action.user, 1), loading: false };

        case DELETE_USER_FAILED:
            return { ...state, loading: false, error: action.message };

        case CREATE_USER: {
            return { ...state, loading: true, error: null };
        }
        case CREATE_USER_SUCCESSED: {
            return {
                ...state,
                user: [...state.user, action.user],
                loading: false
            };
        }

        case CREATE_USER_FAILED:
            return { ...state, loading: false, error: action.message };


        case EDIT_USER: {
            return { ...state, loading: true, error: null, updated: true };
        }
        case EDIT_USER_SUCCESSED:
            console.log([...state.user.splice(action.user, 1),
            action.user]);
            return {
                ...state,
                user: [...state.user.splice(action.user, 1),
                action.user],
                loading: false
            };

        case EDIT_USER_FAILED:
            return { ...state, loading: false, error: action.message };

        default:
            return state;
    }
};
export default reducer;