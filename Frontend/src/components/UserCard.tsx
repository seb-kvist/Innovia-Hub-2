import React from "react";
import type { User } from "./types";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-card">
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
