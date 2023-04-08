import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';
import { pencil } from 'react-icons-kit/icomoon/pencil'
import { Link } from 'react-router-dom';


export default function PaginatedItems() {
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


    const [currentItems, setCurrentItems] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [firstElement, setFirstElement] = useState(0)
    const itemsPerPage = 4;
    const perPageData = 3;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(currentValue.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(currentValue.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, currentValue])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % currentValue.length;
        console.log(newOffset);
        setItemOffset(newOffset);
    };

    const deleteRecord = (id) => {
        const getAllData = JSON.parse(localStorage.getItem('userData'))
        const getFinalData = getAllData.filter((data) => data.id != id)
        localStorage.setItem('userData', JSON.stringify(getFinalData))
        setCurrentValue(getFinalData)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [searchfield, setSearchField] = useState('');
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            const userData = JSON.parse(localStorage.getItem('userData'))
            setAllData(userData)
            setTotalPage(Math.ceil(userData.length / perPageData))
            setCurrentValue(userData.slice(firstElement, 3))
        } else {
            localStorage.setItem('userData', JSON.stringify([]))
        }
    }, [])
    const filteredPersons  = () => {
        const getFilterData = allData.filter(
            person => {
                return (
                    person.fname.toLowerCase().includes(searchfield.toLowerCase()) ||
                    person.lname.toLowerCase().includes(searchfield.toLowerCase()) ||
                    person.email.toLowerCase().includes(searchfield.toLowerCase())
                )
            }
        )
        setCurrentValue(getFilterData)
        console.log(getFilterData, 'getFilter')
    };

    const handleSearch = (evt) => {
        setSearchField(evt.target.value);
        if (evt.target.value !== '') {
            filteredPersons()
        } else {
            setCurrentValue(allData)
        }
    };
    return (
        <>
            <div className="row">
                <div className='col-lg-12'>
                    <input type="search" placeholder="Search..." onChange={handleSearch}></input>
                </div>
            </div>
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
                            currentValue.map((data, id) => {
                                return (
                                    <tr key={id + 1}>
                                        <td>{id + 1}</td>
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
                                                        <Icon icon={pencil} />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <button className='btn btn-danger mx-3' onClick={() => deleteRecord(data.id)}>
                                                        <Icon icon={trash} /> </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    );
}
