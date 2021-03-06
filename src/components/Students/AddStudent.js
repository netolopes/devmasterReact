import React, { Component } from 'react';
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import classnames from 'classnames';
import { connect } from 'react-redux'; 
import { createStudent, clearErrors } from '../../actions/studentActions';

class AddStudent extends Component {
    state = {
        full_name: '',
        birth_date: '',
        location: '',
        stage: '',
        level: '',
        parent_info: '',
        errors: {}
    };

    componentWillUnmount() {
        this.props.clearErrors();
    }

    static getDerivedStateFromProps(props, state) {
        if(props.errors) {
            return {
                errors: props.errors
            }
        }
    }

    submitStudent = (e) => {
        e.preventDefault();
        
        const studentData = {
            full_name: this.state.full_name,
            birth_date: this.state.birth_date,
            location: this.state.location,
            stage: this.state.stage,
            level: this.state.level,
            parent_info: this.state.parent_info
              
        }
        if(this.state.email) {
            studentData.parent_info.email = this.state.email;
        }

        this.props.createStudent(studentData, this.props.history);

    };

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
        if(e.target.name === 'stage') {
            if (e.target.value === 'primary') this.setState({ primaryCheck: true });
            else this.setState({ primaryCheck: false });
        }
    }

    render() {

        const { errors } = this.state;

        const primary_level = (
            <select 
                className={classnames('custom-select', {'is-invalid':errors.level})}
                name='level' 
                id='level' 
                onChange={this.onChangeHandler}
            >
                <option value={0}>Select Level</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
            </select>
        );

        const preparatory_secondary_level = (
            <select 
                className={classnames('custom-select', {'is-invalid':errors.level})} 
                name='level' 
                id='level' 
                onChange={this.onChangeHandler}
            >
                <option value={0}>Select Level</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
        );

        return (
            <SidebarTemplate>
                
                <h1 className='text-center display-4'>Add Student</h1>
                
                <form className='mb-4' onSubmit={this.submitStudent}>
                    <div className='form-group'>
                        <label htmlFor='full_name'>
                            <span className='text-danger'>*</span> Full Name
                        </label>
                        <input
                            type='text'
                            name='full_name'
                            className={classnames('form-control', {'is-invalid':errors.full_name})} 
                            id='full_name'
                            placeholder='Enter Student Full Name'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.full_name}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='birth_date'>
                            <span className='text-danger'>*</span> Birth Date
                        </label>
                        <input
                            type='date'
                            name='birth_date'
                            className={classnames('form-control', {'is-invalid':errors.birth_date})}
                            id='birth_date'
                            placeholder='Enter Student Birth Date'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.birth_date}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='location'>Location</label>
                        <input
                            type='text'
                            name='location'
                            className='form-control'
                            id='location'
                            placeholder='Enter current household'
                            onChange={this.onChangeHandler}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='stage'>
                            <span className='text-danger'>*</span> Stage
                        </label>
                        <select
                            className={classnames('custom-select', {'is-invalid':errors.stage})}
                            name='stage'
                            id='stage'
                            onChange={this.onChangeHandler}
                        >
                            <option value={0}>Select Stage</option>
                            <option value='primary'>Primary</option>
                            <option value='preparatory'>Preparatory</option>
                            <option value='secondary'>Secondary</option>
                        </select>
                        <div className="invalid-feedback">
                            <strong>{errors.stage}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='level'>
                            <span className='text-danger'>*</span> Level
                        </label>
                        {this.state.primaryCheck
                            ? primary_level
                            : preparatory_secondary_level}

                        <div className="invalid-feedback">
                            <strong>{errors.level}</strong>
                        </div>
                    </div>

                    <hr />

                    
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='btn btn-success btn-block'
                        >
                            Save Student
                        </button>
                    </div>
                </form>
            </SidebarTemplate>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createStudent, clearErrors })(AddStudent);
