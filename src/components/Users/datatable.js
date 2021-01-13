import React, {useState,useRef,createRef} from 'react';
//import {render} from 'react-dom';
import ServerTable from './serverTable';


function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersIDs, setUsersIDs] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const check_all = useRef(false);


const handleCheckboxTableChange = (event) => {
  
    const value = event.target.value;
alert(value);
    /*
    let selectedUsers = selectedUsers.slice();

    selectedUsers.includes(value) ?
        selectedUsers.splice(selectedUsers.indexOf(value), 1) :
        selectedUsers.push(value);

        setSelectedUsers({selectedUsers: selectedUsers}, ()=>{
        check_all.current.checked = _.difference(usersIDs, selectedUsers).length === 0;
    });

    alert('Selected users ID: ' + selectedUsers.join(', '));
    */
    
}

const handleCheckboxTableAllChange = (event) => {
  
  setSelectedUsers({selectedUsers: [...new Set(selectedUsers.concat(usersIDs))]}, ()=>{
        // eslint-disable-next-line no-undef
        check_all.current.checked = _.difference(usersIDs, selectedUsers).length === 0;
    });
    
}




// ----------------

        const url = 'https://5efe2a74dd373900160b3f24.mockapi.io/api/users';
        const columns = ['id', 'name', 'email', 'avatar', 'address', 'created_at', 'actions'];
        let checkAllInput = (<input type="checkbox" ref={check_all}
                                    onChange={handleCheckboxTableAllChange}/>);
        const options = {
            perPage: 5,
            headings: {id: checkAllInput, created_at: 'Created At'},
            sortable: ['name', 'email', 'created_at'],
            columnsWidth: {name: 30, email: 30, id: 5},
            columnsAlign: {id: 'center', avatar: 'center', address: 'center'},
            requestParametersNames: {query: 'search', direction: 'order'},
            responseAdapter: function (resp_data) {
                let usersIDs = resp_data.data.map(a => a.id);
                setUsersIDs({usersIDs: usersIDs}, () => {
                    // eslint-disable-next-line no-undef
                    check_all.current.checked = _.difference(usersIDs, selectedUsers).length === 0;
                });

                return {data: resp_data.data, total: resp_data.total}
            },
            texts: {
                show: 'عرض'
            },
        };


  return (
    <div className="App">
  
  <ServerTable columns={columns} url={url} options={options} bordered hover updateUrl>
                {
                    function (row, column) {
                        switch (column) {
                            case 'id':
                                return (
                                    <input key={row.id} type="checkbox" value={row.id}
                                           onChange={handleCheckboxTableChange}
                                           checked={selectedUsers.includes(row.id)} />
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
  );
}

export default App;
