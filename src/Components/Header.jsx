import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (<>
        <div className='d-flex justify-content-flex-start bg-primary p-5'>
            <h1 className='text-light'>Admin Dashboard</h1>
        </div>
        <div className='d-flex flex-row-reverse m-5'>
            <div>
                <Link to='/form'>
                    <button className='btn btn-primary'>Add Employee</button>
                </Link>
            </div>

        </div>
    </>
    )
}
