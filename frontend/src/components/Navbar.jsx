import { Link } from "react-router";
import { useAuthStore } from "../lib/authStore";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    middleCode
                </Link>
            </div>

            <div className="flex-none">
                {isAuthenticated ? (
                    <button className="btn btn-primary" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
