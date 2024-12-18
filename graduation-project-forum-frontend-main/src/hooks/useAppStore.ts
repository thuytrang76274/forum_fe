import { useContext } from "react";
import { AppContext } from "../store";

function useAppStore() {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
}

export default useAppStore;
