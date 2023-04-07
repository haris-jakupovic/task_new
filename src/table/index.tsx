import { User } from "../types/user";

type UserTableProps = {
  currentUsers: User[];
  handleSortDirectionChange: () => void;
  sortDirection: string;
};
export default function Table({
  currentUsers,
  handleSortDirectionChange,
  sortDirection,
}: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={handleSortDirectionChange}>
            Name{" "}
            {sortDirection === "ASC" ? (
              <span>&#x25B2; </span>
            ) : (
              <span style={{ marginLeft: "10px" }}>&#x25BC;</span>
            )}
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
  );
}