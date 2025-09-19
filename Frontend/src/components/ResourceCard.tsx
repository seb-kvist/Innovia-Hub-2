import React, { useEffect } from "react";
import type { Resource } from "../Interfaces/types";
import "../styles/ResourceCard.css";
import { connection } from "../signalRConnection";

interface Props {
  resource: Resource;
  onToggle: (id: number) => void;
  onStatusUpdate: (id: number, isBookable: boolean) => void; // NEW callback for live updates
}

const ResourceCard: React.FC<Props> = ({
  resource,
  onToggle,
  onStatusUpdate,
}) => {
  useEffect(() => {
    const updateHandler = (data: {
      resourceId: number;
      isBookable: boolean;
    }) => {
      if (data.resourceId === resource.id) {
        // ✅ update resource status directly instead of calling onToggle again
        onStatusUpdate(data.resourceId, data.isBookable);
      }
    };

    connection.on("ReceiveResourceStatusUpdate", updateHandler);
    return () => {
      connection.off("ReceiveResourceStatusUpdate", updateHandler);
    };
  }, [resource.id, onStatusUpdate]);

  return (
    <div className="resource-card">
      {/* Image */}
      <img
        src={resource.imageUrl}
        alt={resource.name}
        className="resource-card-img"
      />

      {/* Content */}
      <div className="resource-card-content">
        <h3 className="resource-card-title">{resource.resourceName}</h3>
        <p className="resource-card-desc">{resource.description}</p>
        <p
          className={`resource-card-status ${
            resource.isBookable ? "status-bookable" : "status-unbookable"
          }`}>
          {resource.isBookable ? "BOKNINGSBAR" : "EJ BOKNINGSBAR"}
        </p>
      </div>

      {/* Toggle */}
      <div className="resource-card-actions">
        <label className="switch">
          <input
            type="checkbox"
            checked={resource.isBookable}
            onChange={() => onToggle(resource.id)} 
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ResourceCard;
