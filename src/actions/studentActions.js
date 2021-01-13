import axios from 'axios';
import {
    SET_LOADING,
    GET_STUDENTS,
    GET_STUDENT,
    GET_ERRORS,
    SET_MESSAGE
} from './types';

export const getStudents = (searchData) => (dispatch) => {
    /*
    dispatch(setLoading());
    axios
        .post('/students/search', searchData)
        .then((res) => {
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: GET_STUDENTS,
                payload: null
            });
        });
        */
};

export const getStudent = (id) => (dispatch) => {
    dispatch(setLoading());
    axios
        .get(`/student/${id}`,tokenConfig())
        .then((res) => {
            dispatch({
                type: GET_STUDENT,
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

export const createStudent = (studentData, history) => (dispatch) => {
    axios
        .post('/students', studentData, tokenConfig())
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

export const updateStudent = (studentData, history,id) => dispatch => {
    
    axios.put(`/student`, studentData,tokenConfig())
        .then(() => {
            const msg = {
                content: 'Student Updated Successfully',
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
}

export const deleteStudent = (id) => (dispatch) => {
    axios
        .delete(`/student/${id}`,tokenConfig())
        .then(() => {
         
          // dispatch(studentsPaginate());
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};



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