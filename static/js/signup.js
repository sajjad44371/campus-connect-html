console.log("Signup file loaded successfully!");

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
