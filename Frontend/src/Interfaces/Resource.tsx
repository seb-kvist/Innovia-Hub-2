import type { ResourceType } from "./ResourceType";

export interface Resource extends ResourceType {
  isBookable: boolean;
  updating?: boolean;
}
