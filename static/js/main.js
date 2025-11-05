console.log("js file loaded successfully!");

function selectRole(role) {
  const roleInput = document.getElementById("roleInput");
  const studentTab = document.getElementById("student-tab");
  const facultyTab = document.getElementById("faculty-tab");
  const roleSpecificField = document.getElementById("roleSpecificField");

  roleInput.value = role;

  // Update tab styles (DaisyUI active class)
  if (role === "student") {
    studentTab.classList.add("tab-active");
    facultyTab.classList.remove("tab-active");

    // Change label and input for Student
    roleSpecificField.innerHTML = `
                    <label for="student_id" class="label block font-medium text-sm text-gray-700">Student ID / Roll No.</label>
                    <input id="student_id" name="student_id" type="text" required
                           class="input input-bordered w-full p-3 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="123456">
                `;
  } else {
    studentTab.classList.remove("tab-active");
    facultyTab.classList.add("tab-active");

    // Change label and input for Faculty
    roleSpecificField.innerHTML = `
                    <label for="faculty_code" class="label block font-medium text-sm text-gray-700">Faculty ID / Unique Code</label>
                    <input id="faculty_code" name="faculty_code" type="text" required
                           class="input input-bordered w-full p-3 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" placeholder="FAC-007">
                `;
  }
}

// registration

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (document.getElementById("roleInput")) {
    selectRole(document.getElementById("roleInput").value);
  }
});

async function handleSignup(e) {
  e.preventDefault();

  const role = document.getElementById("roleInput").value;
  const username = document.getElementById("email").value.split("@")[0];
  const name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password").value;
  console.log(role, username, name, email, password);

  let roleSpecificData = {};
  if (role === "student") {
    roleSpecificData.student_id = document.getElementById("student_id").value;
  } else if (role === "faculty") {
    roleSpecificData.faculty_code =
      document.getElementById("faculty_code").value;
  }

  const registrationUrl = "/api/auth/register/";

  try {
    const response = await fetch(registrationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: password,
        password2: password2,
        role: role,
        ...roleSpecificData,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Registration Successful for ${role}! You can now log in.`);
      window.location.href = "/login/";
    } else {
      const errorMsg =
        data.error ||
        (Object.keys(data).length > 0
          ? `${Object.keys(data)[0]}: ${data[Object.keys(data)[0]][0]}`
          : "Registration failed.");
      alert(`Registration Failed: ${errorMsg}`);
    }
  } catch (error) {
    console.error("Network Error during Registration:", error);
    alert("A network error occurred. Please check your connection.");
  }
}

// login
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("login-password").value;

  const loginUrl = "/api/auth/login/";

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_role", data.role);

      alert(`Login Successful! Welcome, ${data.username}`);

      if (data.role === "student") {
        window.location.href = "/studentDashboard/";
      } else if (data.role === "faculty") {
        window.location.href = "/facultyDashboard/";
      } else {
        window.location.href = "/";
      }
    } else {
      alert(`Login Failed: ${data.error || "Invalid Credentials."}`);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("A network error occurred. Please try again.");
  }
}
