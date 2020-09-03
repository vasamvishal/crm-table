export const USER_FETCH_REQUESTED = "USER_FETCH_REQUESTED"
export const USER_FETCH_SUCCEEDED = "USER_FETCH_SUCCEEDED"
export const USER_FETCH_FAILED = "USER_FETCH_FAILED"

export const DELETE_USER = "DELETE_USER"
export const DELETE_USER_SUCCESSED = "DELETE_USER_SUCCESSED"
export const DELETE_USER_FAILED = "DELETE_USER_FAILED"

export const CREATE_USER = "CREATE_USER"
export const CREATE_USER_SUCCESSED = "CREATE_USER_SUCCESSED"
export const CREATE_USER_FAILED = "CREATE_USER_FAILED"

export const EDIT_USER = "EDIT_USER"
export const EDIT_USER_SUCCESSED = "EDIT_USER_SUCCESSED"
export const EDIT_USER_FAILED = "EDIT_USER_FAILED"


export const user_fetch_requested = () => ({
    type: 'USER_FETCH_REQUESTED',
});

export const delete_user = (user) => ({
    type: 'DELETE_USER',
    payload: user
});

export const create_user = (user) => ({
    type: 'CREATE_USER',
    payload: user
});

export const edit_user = (user) => ({
    type: 'EDIT_USER',
    payload: user
});


// export const user_fetch_sucessed = (data) => ({
//     type: 'USER_FETCH_SUCCEEDED',
//     payload:data
// });

// export const user_fetch_failed = () => ({
//     type: 'USER_FETCH_FAILED',
// });