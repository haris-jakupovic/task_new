import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/style.css";
import { User } from "./types/user";
import Header from "./components/Header";
import Table from "./components/Table";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
  };

  const sortedUsers = [...users].sort((a, b) =>
    sortDirection === "ASC"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const filteredUsers = sortedUsers.filter((user) =>
    user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usersPerPage = 5;
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <Header
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        totalUsers={totalUsers}
      />
      <Table
        currentUsers={currentUsers}
        handleSortDirectionChange={handleSortDirectionChange}
        sortDirection={sortDirection}
      />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;
