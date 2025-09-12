import React from "react";
import type { Resource } from "./types";

interface Props {
  resource: Resource;
  onToggle: (id: number) => void;
}

const ResourceCard: React.FC<Props> = ({ resource, onToggle }) => {
  return (
    <div className="resource-card">
      <p>{resource.resourceName}</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={resource.isBookable}
          disabled={resource.updating}
          onChange={() => onToggle(resource.id)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ResourceCard;
