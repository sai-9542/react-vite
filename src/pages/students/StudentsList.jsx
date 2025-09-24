import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../../api/api";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentsList = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    api
      .get("/users") // Uses baseURL from api.js
      .then((res) => {
        setUsers(res.data); // Axios puts response data in `res.data`
        setPending(false);
      })
      .catch((err) => {
        console.error("Axios error:", err);
        setPending(false);
      });
  }, []);
  

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username },
    { name: "Email", selector: (row) => row.email },
    { name: "City", selector: (row) => row.address.city },
    {
    name: "Action",
    cell: (row) => (
      <div className="flex gap-2">
        <Link to={`/student/view/${row.id}`} className="text-blue-600 flex items-center gap-1">
          <VisibilityIcon fontSize="small" /> 
        </Link>
        <Link to={`/student/edit/${row.id}`} className="text-yellow-600 flex items-center gap-1">
          <EditIcon fontSize="small" /> 
        </Link>
        <Link to={`/student/delete/${row.id}`} className="text-red-600 flex items-center gap-1">
          <DeleteIcon fontSize="small" /> 
        </Link>
      </div>
    ),
  }
  ];

  const customStyles = {
    table: {
      style: {
        border: "1px solid #ccc",
      },
    },
    headRow: {
      style: {
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f4f4f4",
      },
    },
    headCells: {
      style: {
        borderRight: "1px solid #ccc",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #ccc",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid #ccc",
      },
    },
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Students List</h2>
        <Link
          to="/students/create"
          className="bg-black text-white font-bold px-5 py-2 rounded shadow hover:bg-gray-800 transition"
        >
          Add
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={users}
        progressPending={pending}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default StudentsList;
