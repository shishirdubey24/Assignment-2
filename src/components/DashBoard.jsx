import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
const DashBoard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch JSON data from the public folder
  useEffect(() => {
    fetch("/public/Mockdata.json",)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort Data
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard - User Details</h2>

      {/* Search Input */}
      <FaFilter className="absolute left-3 top-3 text-gray-900" /> 
      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Data Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-2 cursor-pointer"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Name {sortOrder === "asc" ? "🔼" : "🔽"}
            </th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(filteredData.length / rowsPerPage) ? prev + 1 : prev
            )
          }
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
