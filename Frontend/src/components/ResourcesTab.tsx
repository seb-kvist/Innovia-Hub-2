import React, { useEffect, useState } from "react";
import { getAllResources, changeResourceStatus } from "../api/api";
import type { Resource } from "./types";
import ResourceCard from "./ResourceCard";

interface Props {
  token: string;
}

const ResourcesTab: React.FC<Props> = ({ token }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const data = await getAllResources(token);
        setResources(data);
      } catch {
        setError("Kunde inte ladda resurser");
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, [token]);

  const toggleResourceStatus = async (id: number) => {
    try {
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, updating: true } : r))
      );

      await changeResourceStatus(id, token);

      setResources((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isBookable: !r.isBookable, updating: false } : r
        )
      );
    } catch {
      alert("Kunde inte ändra resursstatus");
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, updating: false } : r))
      );
    }
  };

  if (loading) return <p>Laddar resurser...</p>;
  if (error) return <p className="error">{error}</p>;
  if (resources.length === 0) return <p>Inga resurser hittades</p>;

  return (
    <div className="resources">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} onToggle={toggleResourceStatus} />
      ))}
    </div>
  );
};

export default ResourcesTab;
