import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import errorReducer from './errorReducer';
import studentReducer from './studentReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    admin: adminReducer,
    student: studentReducer,
    user: userReducer,
    errors: errorReducer,
    message: messageReducer
});
