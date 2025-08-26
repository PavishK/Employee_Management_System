import React,{useState} from 'react'
import toast from 'react-hot-toast';

function AddEmployeeComponent({onClose, onSaveEmp}) {
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
    });

    const addNewEmployee=()=>{

      if(!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.position){
        toast.error("Fill out the fields!");
        return;
      }

      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email.trim())){
        toast.error("Invalid email format!");
        return;
      }

        onSaveEmp({email:newEmployee.email.trim(),...newEmployee});
        setNewEmployee({ firstName: "", lastName: "", email: "", position: "" });
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Employee</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="First Name"
                value={newEmployee.firstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newEmployee.lastName}
                onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={addNewEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                Add
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl shadow-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default AddEmployeeComponent