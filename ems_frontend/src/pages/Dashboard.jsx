import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AddEmployeeComponent from "../components/AddEmployeeComponent";
import DeleteModal from "../components/DeleteModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import ProfileMenu from "../components/ProfileMenu";
import Loader from "../components/Loader";
import axios from "axios";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate=useNavigate();
  const location=useLocation();
  const [user, setUser] = useState(null);
  const [userID,setUserId]=useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [makeLoading, setMakeLoading] = useState(false);
  
  const apiUrl=import.meta.env.VITE_SERVER_API;
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
       toast.success("Logged in successfully!");
       setUserId(Number(location.pathname.split('/')[3]));
      } else {
        toast.error("Please login to continue");
      }
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(()=>{
    fetchEmployeeData();
  },[]);
  
  const fetchEmployeeData=async()=>{
   setMakeLoading(true);
    try {
      const res=await axios.get(apiUrl+`/api/employee/get-all-data/${Number(location.pathname.split('/')[3])}`);
      setEmployees(res.data);
    } catch (error) {
      toast.error("Unable to fetch employee data!");
    } finally {
      setMakeLoading(false);
    }
  }


  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);

  const handleAddEmployee = async(newEmployee) => {
    setMakeLoading(true);
    try {
      const body={user:{id:userID},...newEmployee};
      const res=await axios.post(apiUrl+"/api/employee/save-data",body);
      setEmployees([...employees, { id: res.data.id, ...newEmployee }]);
      setShowAddModal(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setMakeLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteEmployeeId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async() => {
    setMakeLoading(true);
    try {
      const res= await axios.delete(apiUrl+"/api/employee/delete-data/"+deleteEmployeeId);      
      setEmployees(employees.filter((emp) => emp.id !== deleteEmployeeId));
      setDeleteEmployeeId(null);
      setShowDeleteModal(false);

      toast.success(res.data);
    } catch (error) {
      toast.error("Unable to delete employee data!");
    } finally {
      setMakeLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setSelectedEmployeeId(id);
    setShowEditModal(true);
  };

  const handleSaveEdit = async(updatedEmployee) => {
    setMakeLoading(true);
    try {
      const res= await axios.put(apiUrl+"/api/employee/update-data/"+updatedEmployee.id,updatedEmployee);
      setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
      setSelectedEmployeeId(null);
      setShowEditModal(false);
      toast.success(res.data);
    } catch (error) {
      toast.error("Unable to update employee data!");
      console.log(error)
    } finally {
      setMakeLoading(false);
    }
  };

  const handleLogout = async () => {
    setMakeLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("logged out successfully!");
      setTimeout(navigate("/home"),2100);
    } catch (error) {
      toast.error("Logout failed!");
    } finally {
      setMakeLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          {user && <ProfileMenu user={user} onLogout={handleLogout} />}
        </div>

        <div className="mb-4">
          <button
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            onClick={() => setShowAddModal(true)}
          >
            Add Employee
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">ID</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">First Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Last Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Position</th>
                <th className="px-6 py-3 text-center text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                    No employees found. Please add new employees.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4">{emp.id}</td>
                    <td className="px-6 py-4 capitalize">{emp.firstName}</td>
                    <td className="px-6 py-4 capitalize">{emp.lastName}</td>
                    <td className="px-6 py-4">{emp.email}</td>
                    <td className="px-6 py-4 capitalize">{emp.position}</td>
                    <td className="px-6 py-4 p-2 text-center space-x-2 space-y-2">
                      <button
                        onClick={() => handleEditClick(emp.id)}
                        className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(emp.id)}
                        className="cursor-pointer px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddEmployeeComponent
          onClose={() => setShowAddModal(false)}
          onSaveEmp={(data) => handleAddEmployee(data)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          employeeName={employees.find((emp) => emp.id === deleteEmployeeId)?.firstName || ""}
        />
      )}

      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {makeLoading && <Loader />}
    </div>
  );
}