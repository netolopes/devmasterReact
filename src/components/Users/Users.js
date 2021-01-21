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

    console.log('process', process.env.REACT_APP_BASE_URL);
        // const { users, loading } = this.props.user;
       // console.log(users);  
       
       //const baseUrl = 'http://157.245.165.207:3333/';
            let self = this;
         //  const url = 'https://5efe2a74dd373900160b3f24.mockapi.io/api/users';
         //  const columns = ['id', 'name', 'email', 'avatar', 'address', 'created_at', 'actions'];
         
            const url = process.env.REACT_APP_BASE_URL+'users_paginate';
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


/*
default server neginx
=======
server {
    listen 80;
    server_name _;
    return 404;
  }
  
  # Redireciona para HTTPS
  server {
    listen 80;
    listen [::]:80;
    server_name jrpsoftware.com.br;
    return 301 https://$host$request_uri;
  }
  
  server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
  
    server_name jrpsoftware.com.br;
  
    if ($host != "jrpsoftware.com.br") {
      return 404;
    }
  
    ssl_certificate /etc/letsencrypt/live/jrpsoftware.com.br/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/jrpsoftware.com.br/privkey.pem; # managed by Certbot
    ssl_trusted_certificate /etc/letsencrypt/live/jrpsoftware.com.br/chain.pem;
  
    # Improve HTTPS performance with session resumption
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 5m;
  
    # Enable server-side protection against BEAST attacks
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;
  
    # Disable SSLv3
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  
    # Diffie-Hellman parameter for DHE ciphersuites
    # $ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
  
    # Enable HSTS (https://developer.mozilla.org/en-US/docs/Security/HTTP_Strict_Transport_Security)
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
  
    # Enable OCSP stapling (http://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox)
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
  
    # Add index.php to the list if you are using PHP
    index index.html index.htm index.nginx-debian.html index.php;
  
    location = /favicon.ico {
      access_log off; 
          log_not_found off;
    }
  
    location / {
      proxy_pass http://localhost:3333;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    location ~ /\.ht {
      deny all;
    }
  
    location ~ /\. {
      access_log off;
      log_not_found off;
      deny all;
    }
  
    gzip on;
    gzip_disable "msie6";
  
    gzip_comp_level 6;
    gzip_min_length 1100;
    gzip_buffers 4 32k;
    gzip_proxied any;
    gzip_types
    text/plain
    text/css
    text/js
    text/xml
    text/javascript
    application/javascript
    application/x-javascript
    application/json
    application/xml
    application/rss+xml
    image/svg+xml;
  
    access_log off;
    #access_log  /var/log/nginx/jrpsoftware.com.br-access.log;
    error_log /var/log/nginx/jrpsoftware.com.br-error.log;
  
    #include /etc/nginx/common/protect.conf;
  }

  */