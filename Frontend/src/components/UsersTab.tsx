import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/api";
import type { User } from "./types";
import UserCard from "./UserCard";

interface Props {
  token: string;
}

const UsersTab: React.FC<Props> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const filteredUsers =
    filter.trim() === ""
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers(token);
        setUsers(data);
      } catch {
        setError("Kunde inte ladda användare");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [token]);

  if (loading) return <p>Laddar användare...</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) return <p>Inga användare hittades</p>;

  const handleDeleteUser = (id: string) => {
    setUsers(filteredUsers.filter((u) => u.id !== id));
  };

  return (
    <div className="users">
      <input
        type="text"
        placeholder="Sök användare..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="user-filter-input"
      />
      {filteredUsers.map((u) => (
        <UserCard key={u.id} user={u} onDelete={handleDeleteUser} />
      ))}
    </div>
  );
};

export default UsersTab;
