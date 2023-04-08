import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';
import { pencil } from 'react-icons-kit/icomoon/pencil'
import { Link } from 'react-router-dom';
import PaginatedItems from './PaginatedItems';

export default function MainData() {
  const [currentValue, setCurrentValue] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const data = JSON.parse(localStorage.getItem('userData'));
      setCurrentValue(data);
    }
    else {
      localStorage.setItem('userData', JSON.stringify([]));
    }
  }, [])
  const deleteRecord = (id) => {
    const getAllData = JSON.parse(localStorage.getItem('userData'))
    const getFinalData = getAllData.filter((data) => data.id != id)
    localStorage.setItem('userData', JSON.stringify(getFinalData))
    setCurrentValue(getFinalData)
  }


  return (
    <div>
      <div className='container'>
        <table className='table table-info table-striped table-hover table-sm'>
          <thead>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Skills</th>
            <th>About</th>
            <th>Actions</th>
          </thead>
          <tbody className='table group-divider'>
            {
              currentValue.length > 0 ?
                currentValue.map((data, id) => {
                  return (
                    <tr key={id+1}>
                      <td>{id+1}</td>
                      <td>{data.fname}</td>
                      <td>{data.lname}</td>
                      <td>{data.email}</td>
                      <td>{data.number}</td>
                      <td>{data.gender}</td>
                      <td>{data.dept}</td>
                      <td>{data.skills}</td>
                      <td>{data.about}</td>
                      <td>
                        <div className='d-flex flex-column align-items-center'>
                          <div>
                            <Link to={`/edit/${data.id}`} className='btn btn-warning my-2'>
                            <Icon icon={pencil }/>  
                            </Link>
                            </div>
                          <div>
                            <button className='btn btn-danger mx-3' onClick={() => deleteRecord(data.id)}>
                              <Icon icon={trash}/> </button>
                              </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
                : <div className='d-flex justify-content-center'>
                  <div>No Data Avaliable to Show</div>
                </div>
            }
          </tbody>
        </table>
        <PaginatedItems />,
      </div>
    </div>
  )
}
