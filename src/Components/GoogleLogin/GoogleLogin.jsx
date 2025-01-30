// // import React from "react";
// // import { GoogleLogin } from "@react-oauth/google";
// // import jwt_decode from "jwt-decode";

// // const GoogleLoginButton = () => {
// //   const handleLoginSuccess = (response) => {
// //     const decoded = jwt_decode(response.credential); // JWT token decode karna
// //     console.log("User Info:", decoded); // User data console mein
// //   };

// //   const handleLoginFailure = (error) => {
// //     console.error("Login Failed:", error); // Error console mein
// //   };

// //   return (
// //     <div>
// //       <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
// //     </div>
// //   );
// // };

// // export default GoogleLoginButton;



// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";

// const GoogleLoginButton = () => {
//   const handleLoginSuccess = async (response) => {
//     const jwt_decode = (await import("jwt-decode")).default; // Dynamically import jwt-decode
//     const decoded = jwt_decode(response.credential); // Decode the JWT token
//     console.log("User Info:", decoded); // Log user data to the console
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Login Failed:", error); // Log error to the console
//   };

//   return (
//     <div>
//       <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
//     </div>
//   );
// };

// export default GoogleLoginButton;



import React from "react";
// import { GoogleLogin } from "react-google-login";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log("Google User Data:", response.profileObj);

    // Send this data to the backend for saving to MongoDB
    fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.profileObj),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response from server:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {/* <GoogleLogin
        clientId="573186301957-90j5e8g8ompunn9f6e9rnlcvi3mgsche.apps.googleusercontent.com" // Replace with your Client ID
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
