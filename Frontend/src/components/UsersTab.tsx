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

  return (
    <div className="users">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default UsersTab;
