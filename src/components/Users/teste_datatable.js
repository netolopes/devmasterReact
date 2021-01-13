import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, setMessage } from '../../actions/userActions';
import ServerTable from './serverTable';
import _ from 'lodash';


class Users extends Component {

 //   state = {
 //       feedback_msg: null
 //   }

 //----------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            usersIDs: [],
            isAllChecked: false,
            feedback_msg: null
        };

        this.handleCheckboxTableChange = this.handleCheckboxTableChange.bind(this);
        this.handleCheckboxTableAllChange = this.handleCheckboxTableAllChange.bind(this);
        this.check_all = React.createRef();
    }


    handleCheckboxTableChange(event) {
        const value = event.target.value;
        let selectedUsers = this.state.selectedUsers.slice();

        selectedUsers.includes(value) ?
            selectedUsers.splice(selectedUsers.indexOf(value), 1) :
            selectedUsers.push(value);

        this.setState({selectedUsers: selectedUsers}, ()=>{
          
            this.check_all.current.checked = _.difference(this.state.usersIDs, this.state.selectedUsers).length === 0;
        });

        alert('Selected users ID: ' + selectedUsers.join(', '));
    }

    handleCheckboxTableAllChange(event){
        this.setState({selectedUsers: [...new Set(this.state.selectedUsers.concat(this.state.usersIDs))]}, ()=>{
           
            this.check_all.current.checked = _.difference(this.state.usersIDs, this.state.selectedUsers).length === 0;
        });
    }

    //----------------------------------------


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
        console.log(users);  
       /*
        let tableContent;
        if(loading === true && users === null) {
            tableContent = <div className='text-center'><Spinner /></div>;
        }
        else if(loading === false && users === null) {
            tableContent = <h1 className="display-4 text-danger">No Users Found :(</h1>
        }
        else {    
           */   

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






            let self = this;
         //   const url = 'https://5efe2a74dd373900160b3f24.mockapi.io/api/users';
         //   const url = 'http://localhost:3333/users';
       
          const url = users;
          // const url = 'http://localhost:3333/users?Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsIm5hbWUiOiJ0ZXN0ZSIsImlhdCI6MTYwOTc5MjQ3MywiZXhwIjoxNjA5ODc4ODczfQ.nMOdDNGAATkLRylqjPev6PV_u5XfobcVaxZdqoHS9GI';
            const columns = ['id', 'name', 'email', 'created_at', 'actions'];
            let checkAllInput = (<input type="checkbox" ref={this.check_all}
                                        onChange={this.handleCheckboxTableAllChange}/>);
            const options = {
                perPage: 5,
                headings: {id: checkAllInput, created_at: 'Created At'},
                sortable: ['name', 'email', 'created_at'],
                columnsWidth: {name: 30, email: 30, id: 5},
                columnsAlign: {id: 'center', avatar: 'center', address: 'center'},
                requestParametersNames: {query: 'search', direction: 'order'},
                responseAdapter: function (resp_data) {
                    let usersIDs = resp_data.data.map(a => a.id);
                    self.setState({usersIDs: usersIDs}, () => {
                     
                        self.check_all.current.checked = _.difference(self.state.usersIDs, self.state.selectedUsers).length === 0;
                    });
    
                    return {data: resp_data.data, total: resp_data.total}
                },
                texts: {
                    show: 'Qtde'
                },
            };
//  }

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
                <ServerTable columns={columns} url={url} options={options} bordered hover updateUrl>
                {
                    function (row, column) {
                        switch (column) {
                            case 'id':
                                return (
                                    <input key={row.id} type="checkbox" value={row.id}
                                           onChange={self.handleCheckboxTableChange}
                                           checked={self.state.selectedUsers.includes(row.id)} />
                                );
                            case 'avatar':
                                return (<img src={row.avatar} className="table-image"/>);
                            case 'address':
                                return (
                                  <ul>
                                      <li>Street: {row.address.address1}</li>
                                      <li>City: {row.address.city}</li>
                                      <li>Country: {row.address.country}</li>
                                  </ul>
                                );
                            case 'actions':
                                return (
                                    <div style={{textAlign: 'center'}}>
                                        <a className="btn btn-primary btn-xs table-actions-btn"
                                           href={'users/' + row.id + '/edit'}>
                                            <i className="fa fa-pencil-alt"/></a>
                                        <a className="btn btn-danger btn-xs table-actions-btn">
                                            <i className="fa fa-trash"/></a>
                                    </div>
                                );
                            default:
                                return (row[column]);
                        }
                    }
                }
            </ServerTable>
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
