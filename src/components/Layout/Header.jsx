import {
  Navbar,
  Nav,
  Container,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authActions } from "../../store/authSlice";
import Auth from "../Auth/Auth";
import Profile from '../Auth/Profile'
import { toggleCart } from "../../store/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginModalOpen = useSelector((state) => state.auth.isLoginModalOpen);
  const isProfileModalOpen = useSelector(
    (state) => state.auth.isProfileModalOpen
  );

  const openProfileModalHandler = () => {
    dispatch(authActions.openProfileModal());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const openLoginModalHandler = () => {
    dispatch(authActions.openLoginModal());
  };

  const openFavoritesHandler = () => {
    navigate("/favorites");
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <Navbar style={{
        background: 'linear-gradient(135deg, rgb(0, 150, 255)  0%, rgba(9, 9, 121, 1) 65%, rgba(2, 0, 36, 1) 100%)'
      }} expand="lg" className="text-white"
        sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white">
            <b></b>Tech-Infinite
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex me-2" style={{ maxWidth: "350px" }} onSubmit={submitSearchHandler}  >
              <InputGroup className="w-100">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-light" type="submit">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/about" className="text-white">
                About
              </Nav.Link>
              {isLoggedIn && <Nav.Link as={Link} to="/orders" className="text-white">
                Orders
              </Nav.Link>}

              <Button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={openFavoritesHandler}
                    className="text-white ms-2"
                  >
                    <i className="bi bi-heart"></i>
                  </Button>

              <Button
                style={{ backgroundColor: "transparent", border: "none" }} 
                className="text-white ms-2" 
                onClick={() => dispatch(toggleCart())}
              >
                <i className="bi bi-cart"></i>
              </Button>

              {isLoggedIn ? (
                <>
                  
                  <Button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={openProfileModalHandler}
                    className="text-white ms-2"
                  >
                    <i className="bi bi-person"></i>
                  </Button>
                  <Button
                    onClick={logoutHandler}
                    variant="danger"
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={openLoginModalHandler}
                  variant="outline-light"
                  className="ms-2"
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Auth show={isLoginModalOpen} />

      {isLoggedIn && (
        <Profile
          show={isProfileModalOpen}
          onHide={() => dispatch(authActions.closeProfileModal())}
        />
      )}
    </>
  );
};

export default Header;
