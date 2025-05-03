import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import app from "../../firebase/firebase.config";




// Create AuthContext for global state management
export const AuthContext = createContext();


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // State variables
  const [loading, setLoading] = useState(false); 
  const [user, setUser] = useState(null); 
  const [resortData, setResortData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [allResortData, setAllResortData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]); 
  const [role, setRole] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);



  // Function to create user and send data to backend
  const createUser = async (name, email, password, membership) => {
    setLoading(true);
    try {
      // Check if user already exists in the backend
      const userExistsResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );

      if (userExistsResponse.status === 404) {
        console.log("User not found, proceeding with registration");
      } else if (!userExistsResponse.ok) {
        throw new Error("Failed to check if user exists");
      } else {
        const userExistsData = await userExistsResponse.json();
        if (userExistsData.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are already registered",
          });
          return; // Stop the registration process
        }
      }

      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;

      // Send user data to backend
      const backendResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            membership,
          }),
        }
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to send user data to backend");
      }

      Swal.fire({
        title: "Successfully Registered",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }
      const userData = await userDataResponse.json();

      if (userData.length > 0) {
        setUser(userData[0]);
      } else {
        console.error("No user data found after registration for email:", email);
      }

      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add the onAuthStateChanged useEffect here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch specific user data from the backend
        fetch(`${import.meta.env.VITE_API_Link}/users?email=${currentUser.email}`)
          .then(async (res) => {
            if (!res.ok) {
              const responseText = await res.text();
              console.error(`Error fetching user: ${responseText}, Status: ${res.status}`);
              if (res.status === 404) {
                setUser(null); // User not found
              } else {
                throw new Error(`Unexpected response: ${res.status}`);
              }
            }
            return res.json();
          })
          .then((userData) => {
            setUser(userData); // Update state with backend user data
          })
          .catch((error) => console.error("Failed to fetch user data:", error));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth]);

  // Set User Role
  const setUserRole = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data from backend");
      }
      const userData = await response.json();
      if (userData.isAdmin) {
        setRole("admin");
      } else {
        setRole("user");
      }
    } catch (error) {
      console.error("Error setting user role:", error.message);
    }
  };

  // Fetch all Users Data
  const fetchAllUsersData = async () => {
    setLoading(true);
    try {
  
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/all-users`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching all users data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setAllUsersData(data);

    } catch (error) {
      console.error("Error fetching all users data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email, isAdmin) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/update-user`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, isAdmin }),
        }
      );

      if (!response.ok) {
        // Log response details for debugging
        const errorText = await response.text();
        throw new Error(
          `Error updating user role: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      // Fetch updated user data
      const updatedUser = await response.json();

      // Log the updated user for debugging
      console.log("Updated user:", updatedUser);

      // Update the state with the updated user
      setAllUsersData((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user role:", error.message);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  // SignIn process (with email and password)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }

      const userData = await userDataResponse.json();
      if (userData.length > 0) {
        setUser(userData[0]);
      } else {
        console.error("No user data found for the email:", email);
      }

      // Show success alert
      Swal.fire({
        title: "Successfully Signed In",
        showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
        hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
      });

      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user.email);

      // Check if the user already exists in the backend
      const userExistsResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${user.email}`
      );

      if (userExistsResponse.status === 404) {
        console.log("User not found, creating new user");

        // User does not exist, send user data to backend
        const backendResponse = await fetch(
          `${import.meta.env.VITE_API_Link}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.displayName || "", // Use displayName if available
              email: user.email,
              photoURL: user.photoURL,
            }),
          }
        );

        if (!backendResponse.ok) {
          const errorText = await backendResponse.text();
          console.error(
            `Failed to update backend data with Google user: ${backendResponse.status} ${backendResponse.statusText}`
          );
          console.error("Response text:", errorText);
          throw new Error("Failed to update backend data with Google user");
        }

        // Set user state with new user data
        const newUser = {
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL,
        };
        setUser(newUser);

        console.log("New user signed up with Google:", user);
      } else if (userExistsResponse.ok) {
        const userExistsData = await userExistsResponse.json();

        if (userExistsData.length > 0) {
          // User exists, set user state with fetched userData
          setUser(userExistsData[0]);
          console.log("User logged in with Google:", user);
        } else {
          // In case the user is not found but the response is ok (not 404), it could be an unexpected scenario
          console.log(
            "Unexpected response: User not found but status is not 404"
          );
        }
      } else {
        const errorText = await userExistsResponse.text();
        console.error(
          `Failed to check if user exists: ${userExistsResponse.status} ${userExistsResponse.statusText}`
        );
        console.error("Response text:", errorText);
        throw new Error("Failed to check if user exists");
      }

      return result;
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out process
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch resort data from the API
  const fetchResortData = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch resort data
      const response = await fetch(`${import.meta.env.VITE_API_Link}/allResorts`);

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          `Error fetching resort data: ${response.status} ${response.statusText}`
        );
      }

      // Parse and update resort data
      const data = await response.json();

      // Ensure the response has the expected structure
      if (data) {
        setResortData(data);
        setFilteredData(data);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching resort data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch resort data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch all resort data from the API
  const fetchAllResorts = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch all resort data
      const url = `${import.meta.env.VITE_API_Link}/allResorts`;
      const response = await fetch(url);

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          `Error fetching all resort data: ${response.status} ${response.statusText}`
        );
      }

      // Parse and update all resort data
      const data = await response.json();
      setAllResortData(data);
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching all resort data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch all resort data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch user data from the backend based on email
  const fetchUserData = async (email) => {
    try {
      // Check if API link is defined in environment variables
      if (!import.meta.env.VITE_API_Link) {
        throw new Error("API link is not defined in environment variables.");
      }

      // Fetch user data
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );

      // Handle API errors
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }

      // Parse and update user data
      const userData = await userDataResponse.json();
      setUser(userData);
    } catch (error) {
      // Handle errors and show user-friendly message
      console.error("Error fetching user data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch user data. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  //Fetch Booking Data
  const fetchBookings = async () => {
    if (!user?.email) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/bookings?email=${user.email}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
  
      const data = await response.json();
      setBookingsData(data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load bookings',
        icon: 'error'
      });
    }
  };

  // ================= BOOKING FUNCTIONS ================= //

/**
 * Create a new booking
 * @param {Object} bookingData - The booking details
 * @returns {Promise<Object>} The created booking data
 */
const createBooking = async (bookingData) => {
  setLoading(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_Link}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create booking');
    }

    const data = await response.json();
    
    // Update local bookings state
    setBookingsData(prev => [data.data, ...prev]);
    
    Swal.fire({
      title: 'Booking Confirmed!',
      text: `Your booking ID: ${data.bookingId}`,
      icon: 'success'
    });

    return data;
  } catch (error) {
    console.error('Booking error:', error);
    Swal.fire({
      title: 'Booking Failed',
      text: error.message,
      icon: 'error'
    });
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Fetch user's bookings
 * @returns {Promise<void>}
 */


/**
 * Cancel a booking
 * @param {string} bookingId - The ID of the booking to cancel
 * @param {string} reason - Reason for cancellation
 * @returns {Promise<Object>} Cancellation result
 */
const cancelBooking = async (bookingId, reason) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_Link}/bookings/${bookingId}/cancel`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ cancellationReason: reason })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to cancel booking');
    }

    const data = await response.json();
    
    // Update local bookings state
    setBookingsData(prev => 
      prev.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'cancelled', cancellation: data.cancellation }
          : booking
      )
    );

    Swal.fire({
      title: 'Booking Cancelled',
      text: data.refundEligible 
        ? 'Your refund will be processed within 5-7 business days' 
        : 'This booking is not eligible for refund',
      icon: data.refundEligible ? 'success' : 'info'
    });

    return data;
  } catch (error) {
    console.error('Cancel booking error:', error);
    Swal.fire({
      title: 'Cancellation Failed',
      text: error.message,
      icon: 'error'
    });
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Fetch all bookings (admin only)
 * @returns {Promise<void>}
 */
const fetchAllBookings = async () => {
  if (role !== 'admin') return;
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_Link}/admin/bookings`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch all bookings');
    }

    const data = await response.json();
    setBookingsData(data.data);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    Swal.fire({
      title: 'Error',
      text: 'Failed to load bookings',
      icon: 'error'
    });
  }
};

// Update the useEffect for bookings to handle admin vs user
useEffect(() => {
  if (user?.email) {
    if (role === 'admin') {
      fetchAllBookings();
    } else {
      fetchBookings();
    }
  }
}, [user?.email, role]);
  
  // Call this function when component mounts or when user.email changes
  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);


  // Fetch all resort data when the component mounts
useEffect(() => {
  fetchAllResorts();
}, []);



// Fetch all resort data and bookings data when the component mounts
useEffect(() => {
  fetchAllResorts();
  fetchResortData();
  if (user?.email) {
    setUserRole(user.email); // Set user role based on email
  }
  
}, [user?.email]); // Add user.email as a dependency



  // Context value to be provided to the app
  const authInfo = {
    loading,
    user,
    updateUser,
    resortData,
    filteredData,
    allResortData,
    allUsersData,
    bookingsData,
    role,
    createBooking,
    cancelBooking,
    fetchAllBookings,
    
    fetchResortData,
    createUser,
    login,
    googleLogin,
    signOut,
    fetchUserData,
    
    setUserRole,
    
  fetchBookings,
  
  
  };

  // Provide the context value to the app
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;