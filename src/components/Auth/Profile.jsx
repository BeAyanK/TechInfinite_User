import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from 'react-redux';
import { setAddress } from '../../store/addressSlice';

const API_KEY = "AIzaSyDVvJYqgz-adO06OWVJcGPCeEdwSMYz1is";
const UPDATE_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
const DATABASE_URL = "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app";

const Profile = ({ show, onHide }) => {
  const dispatch=useDispatch()
  const token = useSelector((state) => state.auth.token);
  const [userId, setUserId] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Saved profile info for display only (read-only)
  const [savedProfile, setSavedProfile] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Editable form input state
  const [formInput, setFormInput] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Fetch profile data when modal opens
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        // Get user data from Firebase Auth
        const authRes = await axios.post(LOOKUP_PROFILE_URL, { idToken: token });
        const user = authRes.data.users[0];
        setUserId(user.localId);

        // Get additional user data from Firebase Realtime Database
        const dbRes = await axios.get(`${DATABASE_URL}/users/${user.localId}.json`);

        // Prepare full profile data
        const profileData = {
          displayName: user.displayName || "",
          email: user.email || "",
          phoneNumber: dbRes.data?.phoneNumber || "",
          address: dbRes.data?.address || "",
        };

        // Set saved profile for display
        setSavedProfile(profileData);

        // Initialize form inputs with saved data
        setFormInput(profileData);
      } catch (err) {
        setError("Failed to load profile data." );
        console.log(err)
        
      }
      setLoading(false);
    };

    if (show) {
      fetchProfile();
    }
  }, [token, show]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit updated profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      // Update Firebase Authentication profile (display name, email)
      await axios.post(UPDATE_PROFILE_URL, {
        idToken: token,
        displayName: formInput.displayName,
        email: formInput.email,
        returnSecureToken: false,
      });

      // Update additional fields in Firebase Realtime Database
      await axios.put(`${DATABASE_URL}/users/${userId}.json`, {
        phoneNumber: formInput.phoneNumber,
        address: formInput.address,
      });


       dispatch(setAddress(formInput.address));

      // Update saved profile with new data after successful update
      setSavedProfile(formInput);

      alert("Profile updated successfully!");
      onHide();
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to update profile.");
    }
    setUpdating(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <p>Loading profile...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <>
            <div className="mb-4">
              <h6>Current Info:</h6>
              <p><strong>Username:</strong> {savedProfile.displayName}</p>
              <p><strong>Email:</strong> {savedProfile.email}</p>
              <p><strong>Phone:</strong> {savedProfile.phoneNumber}</p>
              <p><strong>Address:</strong> {savedProfile.address}</p>
            </div>

            <Form onSubmit={handleProfileSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formInput.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formInput.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={formInput.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={formInput.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" disabled={updating}>
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Profile;
