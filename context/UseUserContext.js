import { useContext } from "react";
import { UserContext } from "./UserContextStore";

export function useUser()  {
  return useContext((UserContext));
}
