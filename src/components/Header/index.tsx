type UserHeaderProps = {
    searchTerm: string;
    handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    totalUsers: number;
  };
  export default function Header({
    searchTerm,
    handleSearchTermChange,
    totalUsers,
  }: UserHeaderProps) {
    return (
      <>
        <h1>Users</h1>
        <label htmlFor="search">Search by city:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="total-records">Total records : {totalUsers}</div>
      </>
    );
  }