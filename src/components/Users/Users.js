/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import swal from 'sweetalert';
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
//import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMessage,deleteUser } from '../../actions/userActions';
import ServerTable from '../../utils/serverTable';
//import _ from 'lodash';


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            usersIDs: [],
            feedback_msg: null
        };

      
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
      
      //  this.props.getUsers();
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    onUpdateStudent = (id) => {
        this.props.history.push(`update-user/${id}`);
        //  href={'/update-user/' + row.id}
    }
   /*
    onDeleteStudent = (id) => {
        if(window.confirm('Are You Sure ?')) {
            this.props.deleteStudent(id);
            // this.props.getStudents({stage: student_stage});
        }
    }
*/
    handleClick = (id) => {
  
        swal({
          title: "Are you sure you want to delete?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.props.deleteUser(id)
            swal("Data deleted successfully", {
              icon: "success",
            }).catch((err) => {
                swal("Failed to delete data!");
            });
          } else {
           // swal("Datano deleted");
          }
        });
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

  
   
*/
    render() {

        // const { users, loading } = this.props.user;
       // console.log(users);  
       

            let self = this;
         //  const url = 'https://5efe2a74dd373900160b3f24.mockapi.io/api/users';
         //  const columns = ['id', 'name', 'email', 'avatar', 'address', 'created_at', 'actions'];
         
            const url = 'http://157.245.165.207:3333/users_paginate';
            const columns = [ 'name', 'email', 'created_at', 'actions'];
            let checkAllInput = (<input type="checkbox" ref={this.check_all}
                                        onChange={this.handleCheckboxTableAllChange}/>);
            const options = {
                perPage: 10,
                headings: {id: checkAllInput, created_at: 'Created At'},
                sortable: ['name', 'email', 'created_at'],
                columnsWidth: {name: 30, email: 30, id: 5},
                columnsAlign: {id: 'center', avatar: 'center', address: 'center'},
                requestParametersNames: {query: 'search', direction: 'order'},
                
                texts: {
                    show: 'Qtde'
                },
            };
  

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

                {/*<button className='btn btn-primary float-right mt-2' ><i className='fas fa-plus'></i> Add New</button> <br/> <br/>*/}
              
                <div className='mt-5'>
                <ServerTable columns={columns} url={url} options={options} bordered hover updateUrl>
                {
                    function (row, column) {
                        switch (column) {
                            /*
                            //--customizar o datatable ,inserir valores fixos etc..
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
                                */
                            case 'actions':
                                return (
                                    <div style={{textAlign: 'center'}}>
                                        <a className="btn btn-primary btn-xs table-actions-btn"
                                          onClick={() => self.onUpdateStudent(row.id)} >
                                            <i className="fa fa-pencil-alt"/></a>
                                        {/*<a className="btn btn-danger btn-xs table-actions-btn"
                                        onClick={() => self.handleClick(row.id)}>
                                <i className="fa fa-trash"/></a>*/}
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
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  //  getUsers: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    message: state.message
})

export default connect(mapStateToProps, { setMessage,deleteUser })(Users);
