import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'



const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [cardView, setCardView] = useState(false)

   const navigotor = useNavigate();

   useEffect(() => {
    getAllEmployees();

   }, [])

   function getAllEmployees(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error(error);
    })
   }

   function addNewEmployee(){
    navigotor('/add-employee')
   }
   function updateEmployee(id){

    navigotor(`/edit-employee/${id}`)
   }

   function removeEmployee(id){
    deleteEmployee(id).then((response) => {
        getAllEmployees();
    }).catch(error =>{
        console.log(error);
    })
   }

    const filteredEmployees = employees.filter(emp => {
        const term = searchTerm.toLowerCase();
        return (
            emp.firstName.toLowerCase().includes(term) ||
            emp.lastName.toLowerCase().includes(term) ||
            emp.email.toLowerCase().includes(term) ||
            String(emp.id).includes(term)
        )
    })

  return (
        <div className='container'>
                <div className='d-flex justify-content-between align-items-center my-3'>
                    <h2 className='m-0'>List of Employees</h2>
                    <div>
                        <button type="button" className="btn btn-primary me-2" onClick={addNewEmployee}>Add Employee</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setCardView(!cardView)}>{cardView ? 'Table View' : 'Card View'}</button>
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className='form-control' placeholder='Search by name, email or id' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                { !cardView && (
                    <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                <th>Employee Id</th>
                <th>Employee first Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
                </tr>
               
            </thead>
            <tbody>
                {
                                        filteredEmployees.map(employee =>
                                                <tr key={employee.id}>
                                                         <td>{employee.id}</td>
                                                        <td>{employee.firstName}</td>
                                                        <td>{employee.lastName}</td>
                                                        <td>{employee.email}</td>
                                                        <td>
                                                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                                                        style={{marginLeft: '10px'}}>Delete</button>
                                                        </td>
                                                </tr>
                                        )
                }
            </tbody>
        </table>
                ) }

                { cardView && (
                    <div className='row'>
                        {filteredEmployees.map(employee => (
                            <div className='col-md-4 mb-3' key={employee.id}>
                                <div className='card h-100'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{employee.firstName} {employee.lastName}</h5>
                                        <h6 className='card-subtitle mb-2 text-muted'>ID: {employee.id}</h6>
                                        <p className='card-text'>{employee.email}</p>
                                        <button className='btn btn-sm btn-info me-2' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-sm btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) }
    </div>
  )
}

export default ListEmployeeComponent