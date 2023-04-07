import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/style.css';

interface User {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
  company: {
    name: string;
  };
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
  };

  const sortedUsers = [...users].sort((a, b) =>
    sortDirection === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
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
      <h1>Users</h1>
      <label htmlFor="search">Search by city:</label>
      <input id="search" type="text" value={searchTerm} onChange={handleSearchTermChange} />
      <div className="total-records">Total records : {totalUsers}</div>
      <table>
        <thead>
          <tr>
          <th onClick={handleSortDirectionChange}>Name{' '}
            {sortDirection === 'ASC' ? (
            <span>&#x25bc;</span> ) : (
            <span>&#x25BC;</span> )}{' '}
            {sortDirection === 'DESC' ? ( 
            <span>&#x25b2;</span> ) : (
            <span>&#x25B2;</span> )}
          </th>
            <th>Address</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;