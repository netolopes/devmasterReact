import axios from 'axios';

import {
    SET_LOADING,
    GET_USERS,
    GET_USER,
    GET_ERRORS,
    SET_MESSAGE
} from './types';



export const getUsers = () => async (dispatch) => {
    /*
    //-----  nao utilizado devido DATATABLE
        let res = await axios.get('/users',tokenConfig());
        dispatch({
            type: GET_USERS,
            payload: res.data
        }) 
         .catch(() => {
            dispatch({
                type: GET_USERS,
                payload: null
            });
        });
        */
};        

export const getUser = (id) => (dispatch) => {
    dispatch(setLoading());
    axios
        .get(`/user/${id}`,tokenConfig())
        .then((res) => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const updateUser = (userData, history, id) => dispatch => {
    //`/users/${id}`
    //SO VAI ALTERAR SE TIVER CM O MSM USUARIO Q VAI EDITAR!
    axios.put('/users/', userData, tokenConfig())
        .then(() => {
            const msg = {
                content: 'User Updated Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/users');
        })
        .catch((err) => {
            alert('You can only change your own account data');
            
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            
        });
}


export const deleteUser = (id) => (dispatch) => {
    axios
        .delete(`/delete/${id}`)
        .then(() => {
          //  dispatch(getStudents({ stage: student_stage }));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

/*
export const createStudent = (studentData, history) => (dispatch) => {
    axios
        .post('/api/students/create', studentData)
        .then(() => {
            const msg = {
                content: 'Student Created Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/students');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};




*/

//setup config/headers and token
export const tokenConfig = () => {
    const token = localStorage.getItem('jwtToken');
    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
}


export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const setMessage = (msg) => {
    return {
        type: SET_MESSAGE,
        payload: msg
    };
};

export const clearErrors = () => {
    return {
        type: GET_ERRORS,
        payload: {}
    };
}