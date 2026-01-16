/*
 =========================
 Authentication API calls
 =========================
 */

// 🔐 LOGIN API
export const loginUser = async (email, password) => {

  const response = await fetch("http://localhost:8080/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  /*
   Backend return:
   {
     token: "...",
     user: {
       role: "USER"
     }
   }
  */
  return response.json();
};


// 📝 REGISTER API
export const registerUser = async (data) => {

  const response = await fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.text(); // "Registration successful"
};
