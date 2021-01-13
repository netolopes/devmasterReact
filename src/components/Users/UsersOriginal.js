import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, setMessage } from '../../actions/userActions';

class Users extends Component {

    state = {
        feedback_msg: null
    }

    static getDerivedStateFromProps(props, state) {
        if(props.message.msg) {
            return {
                feedback_msg: props.message.msg
            }
        }
        return null;
    }

    componentDidMount() {
        const searchData = {
            stage: 'primary'
        }
        this.props.getUsers();
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }
/*
    searchStudent = (stage) => {
        const searchData = {
            stage: stage
        }
        this.props.getUsers(searchData);
    }

    addStudent = () => {
        this.props.history.push('/add-student');
    }

    onUpdateStudent = (student_id) => {
        this.props.history.push(`update-student/${student_id}`);
    }
    
    onDeleteStudent = (student_id, student_stage) => {
        if(window.confirm('Are You Sure ?')) {
            this.props.deleteStudent(student_id, student_stage);
            // this.props.getStudents({stage: student_stage});
        }
    }
*/
    render() {

        const { users, loading } = this.props.user;
       // console.log(users);  
        let tableContent;
        if(loading === true && users === null) {
            tableContent = <div className='text-center'><Spinner /></div>;
        }
        else if(loading === false && users === null) {
            tableContent = <h1 className="display-4 text-danger">No Users Found :(</h1>
        }
        else {    
              
            let usersTable = users.map(user => {
                return(
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className='btn btn-success btn-sm mr-1' >Update</button>
                            <button className='btn btn-danger btn-sm' >Delete</button>
                        </td>
                    </tr>
                );
            });

            tableContent = (
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable}
                    </tbody>
                </table>
            );
        }

        return (
            <SidebarTemplate>

                {/* Start Success Message */}
                {(this.state.feedback_msg) ? 
                    <div className={`alert alert-${this.state.feedback_msg.type} alert-dismissible fade show mt-3`} role="alert">
                        <strong>{this.state.feedback_msg.content}</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                  : null}
                {/* End Success Message */}

                <button className='btn btn-primary float-right mt-2' ><i className='fas fa-plus'></i> Add New Student</button> <br/> <br/>
              
                <div className='mt-5'>
                  {tableContent}
                </div>
            </SidebarTemplate>
        );
    }
}

Users.propTypes = {
  //  student: PropTypes.object.isRequired,
  //  message: PropTypes.object.isRequired,
  //  getStudents: PropTypes.func.isRequired,
  //  setMessage: PropTypes.func.isRequired,
 //   deleteStudent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    message: state.message
})

export default connect(mapStateToProps, { getUsers, setMessage })(Users);
