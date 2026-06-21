import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'



const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([])

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

  return (
    <div className='container'>
        <h2 className='text-center'> List of Employees</h2>
        <button type="button" className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
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
                    employees.map(employee =>
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
    </div>
  )
}

export default ListEmployeeComponent