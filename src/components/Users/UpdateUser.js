import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, updateUser, clearErrors } from '../../actions/userActions'; 
import IsEmpty from '../../validation/IsEmpty';

class UpdateUser extends Component {

    state = {
        name: '',
        email: '',
        errors: {}
    };

    componentDidMount() {
      //match: informacao da rota
        this.props.getUser(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.user.user) {
            const { user } = nextProps.user;
            user.email = IsEmpty(user.email)? '' : user.email;
        
            this.setState({
                name: user.name,
                email: user.email,
            });
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    } 

    submitUser = (e) => {
        e.preventDefault();
        
        const userData = {
            name: this.state.name,
           email: this.state.email
        }
     //   if(this.state.email) {
      //      userData.email = this.state.email;
      //  }

        this.props.updateUser(userData, this.props.history, this.props.match.params.id);
    };

    
    onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]:e.target.value});
     
  }

    render() {
        const { errors } = this.state;

        return (
            <SidebarTemplate>
                
                <h1 className='text-center display-4'>Update User</h1>
                
                <form className='mb-4' onSubmit={this.submitUser}>
                    <div className='form-group'>
                        <label htmlFor='name'>
                            <span className='text-danger'>*</span> Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            value={this.state.name}
                            className={classnames('form-control', {'is-invalid':errors.name})} 
                            id='name'
                            placeholder='Enter User Full Name'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.name}</strong>
                        </div>
                    </div>

                   
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.email}
                            className={classnames('form-control', {'is-invalid':errors.email})}
                            id='email'
                            placeholder='Enter email if exsists'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.email}</strong>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button
                            type='submit'
                            className='btn btn-success btn-block'
                        >
                            Save User
                        </button>
                    </div>
                </form>
            </SidebarTemplate>
        );
    }
}


UpdateUser.propTypes = {
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps, { getUser, updateUser, clearErrors })(UpdateUser);