import { useHistory } from "react-router";

export default function Logout() {
    const history = useHistory();
    sessionStorage.clear();
    history.push("/");
    return null;
}
