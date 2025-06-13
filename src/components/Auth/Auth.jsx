import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchAddress } from "../../store/addressSlice";




const API_Key = "AIzaSyDVvJYqgz-adO06OWVJcGPCeEdwSMYz1is";
const SignUp_Url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SignIn_Url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

const Auth = ({ show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggleMode());
  };

  const closeModalHandler = () => {
    dispatch(authActions.closeLoginModal());
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch(authActions.setError("Email and password are required"));
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        dispatch(authActions.setError("Passwords do not match!"));
        return;
      }
      if (password.length < 6) {
        dispatch(
          authActions.setError("Password must be at least 6 characters.")
        );
        return;
      }
    }

    dispatch(authActions.setLoading(true));
    dispatch(authActions.setError(null));

    const url = isLogin ? `${SignIn_Url}${API_Key}` : `${SignUp_Url}${API_Key}`;

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      });

      const data = response.data;

      dispatch(
        authActions.login({
          token: data.idToken,
          email: data.email,
          userId: data.localId,
        })
      );

      dispatch(fetchAddress(data.localId)) //fetchinng address

      dispatch(authActions.closeLoginModal());
      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message || "Authentication failed!";
      dispatch(authActions.setError(errorMessage));
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(authActions.setError(null));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <Modal show={show} onHide={closeModalHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>AdaptHome {isLogin ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password" // <-- Fixed type
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {error && <p className="text-danger">{error}</p>}

          <div className="d-grid gap-2">
            {!isLoading ? (
              <Button type="submit" variant="success">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            ) : (
              <p>Sending request...</p>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalHandler}>
          Close
        </Button>
        <Button variant="dark" onClick={switchAuthModeHandler}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Auth;
