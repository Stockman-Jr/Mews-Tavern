
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userStatus) => {
    const history = useHistory();
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          if (userStatus === "loggedIn") {
            history.push("/");
          }
        } catch (err) {
          if (userStatus === "loggedOut") {
            history.push("/");
          }
        }
      };
  
      handleMount();
    }, [history, userStatus]);
  };