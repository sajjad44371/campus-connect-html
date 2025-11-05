console.log("js loaded");

const roleSelect = document.getElementById("role");
const roleLabel = document.getElementById("roleLabel");
const roleInputField = document.getElementById("roleInputField");

roleSelect.addEventListener("change", function () {
  if (this.value === "student") {
    roleLabel.textContent = "Student ID / Roll No.";
    roleInputField.name = "student_id";
    roleInputField.placeholder = "123456";
    roleInputField.required = true;
  } else if (this.value === "faculty") {
    roleLabel.textContent = "Faculty Code";
    roleInputField.name = "faculty_code";
    roleInputField.placeholder = "FAC-001";
    roleInputField.required = true;
  }
});

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  // Backend expects: username, email, password, password2, role, student_id/faculty_code
  data.username = data.email.split("@")[0];
  data.name = data.full_name;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/users/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Registration successful! You can now login.");
      signupForm.reset();
    } else {
      console.error(result);
      alert("Error: " + JSON.stringify(result));
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
});
