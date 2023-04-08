import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../bootstrap/dist/css/bootstrap.min.css';

export default function FormData() {
    const navigate = useNavigate();
    const getDataFromLocalStorage = () => {
        const data = localStorage.getItem('userData');
        if (data) {
            return JSON.parse(data);
        }
        else {
            return [];
            // return {};
        }
    }
    const [formValues, setFormValues] = useState(getDataFromLocalStorage());
    const [id,setID] = useState(1);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dept, setDept] = useState('');
    const [skills, setSkills] = useState([]);
    const [about, setAbout] = useState('');

    useEffect(() => {
        window.localStorage.setItem('userData', JSON.stringify(formValues));
    }, [formValues])

    const getSkills = (e) => {
        const { value, checked } = e.target; 

        if (checked) {
            setSkills([...skills, value]);
        }
        else {
            setSkills(skills.filter((e) => e !== value));
        }

    };

    useEffect(() => {
        const getId = window.location.pathname.split('/')[2]
        if (getId !== undefined) {
            const getAllData = JSON.parse(localStorage.getItem('userData'))
            const getData = getAllData.find((data) => data.id == getId)
            setFormValues(getData)
        }
    }, [])

    // Submit Function:
    const handleAddSubmit = (e) => {
        e.preventDefault();
        let data = {
            id,
            fname,
            lname,
            email,
            number,
            gender,
            dept,
            skills,
            about
        }
        setFormValues([...formValues, data]);
        console.log(formValues);
        setID(prevID => prevID + 1 );
        setFname('');
        setLname('');
        setEmail('');
        setNumber('');
        setEmail('');
        setGender('');
        setDept('');
        // setSkills([]);
        setAbout('');
        // navigate('/');
    }

    return (
        <div className='container'>
            <form className="row g-3 needs-validation" novalidate onSubmit={(e) => handleAddSubmit(e)}>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder='First Name' name='FirstName' value={fname} onChange={(e) => setFname(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="validationCustom02" placeholder='Last Name' name='LastName' value={lname} onChange={(e) => setLname(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">Number</label>
                    <input type="number" className="form-control" id="validationCustom03" placeholder='Phone Number' name='Number' value={number} onChange={(e) => setNumber(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom04" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom04" placeholder='johndoe@gmail.com' name='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">
                        Please provide a valid Email.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">Department</label>
                    <select className="form-select" id="validationCustom05" value={dept} name='Dept' onChange={(e) => setDept(e.target.value)} required>
                        <option selected disabled value="">Choose...</option>
                        <option value='PHP' selected={dept === 'PHP'}>PHP</option>
                        <option value='.NET' selected={dept === '.NET'}>.NET</option>
                        <option value='SEO' selected={dept === 'SEO'}>SEO</option>
                        <option value='Mobile' selected={dept === 'Mobile'}>Mobile</option>
                        <option value='Admin/HR' selected={dept === 'Admin/HR'}>Admin/HR</option>
                        <option value='Account' selected={dept === 'Account'}>Account</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>

                <label htmlFor="validationCustom06" className="form-label">Gender:</label>
                <div className='col-12'>
                    <div className="form-check form-check-inline mx-5">
                        <input className="form-check-input" type="radio" name="Gender" id="inlineRadio1" value="Male" checked={gender == 'Male'} onChange={(e) => setGender(e.target.value)} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>

                    <div className="form-check form-check-inline mx-5">
                        <input className="form-check-input" type="radio" name="Gender" id="inlineRadio2" value="Female" checked={gender == 'Female'} onChange={(e) => setGender(e.target.value)} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Female</label>
                    </div>
                </div>

                <label htmlFor="validationCustom07" className="form-label">Skills:&nbsp;</label>
                <div className='col-12'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Programming' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Programming</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Communication' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Communication</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Finance' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Finance</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='Recruitment' id="inlineCheckbox1" value='Recruitment' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox3">Recruitment</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Optimization' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Optimization</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='App Development' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">App Development</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Frontend Technology' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Frontend Technology</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name='skills' id="inlineCheckbox1" value='Backend Technology' onChange={(e) => getSkills(e)} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Backend Technology</label>
                    </div>
                </div>
                <div class="form-floating my-5">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" name='About' value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea">About</label>
                </div>
                <div className='row'>
                    <div className="col-6">
                        <button className="btn btn-primary w-100 my-5" type="submit">Add Employee</button>
                    </div>
                    <div className="col-6">
                        <Link to='/'>
                            <button className='btn btn-danger my-5 w-100'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
