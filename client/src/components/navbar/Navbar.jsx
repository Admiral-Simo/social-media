import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/features/searchSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchInput));
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Sociazen-Media</span>
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon className="icon" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="icon" onClick={toggle} />
        )}
      </div>
      <div className="center">
        <form onSubmit={handleSearch} className="search">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="ml-2"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="cursor-pointer hover:text-yellow-400"
          >
            <SearchOutlinedIcon className="icon" />
          </button>
        </form>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="icon" />
        <EmailOutlinedIcon className="icon" />
        <NotificationsOutlinedIcon className="icon" />
        <div
          className="user"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/profile/${currentUser.id}`)}
        >
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
