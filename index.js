const universities = [
  {
      id: 1,
      name: "Superior University",
      departments: [
          {
              id: 1,
              name: "Department of Computer Science",
              specializations: [
                  {
                      id: 1,
                      name: "Data Science",
                      students: [
                          { id: 1, name: "John Doe", email: "johndoe@example.com", age: 20 },
                          { id: 2, name: "Jane Doe", email: "janedoe@example.com", age: 22 }
                      ]
                  },
                  {
                      id: 2,
                      name: "Software Engineering",
                      students: [
                          { id: 3, name: "Bob Smith", email: "bobsmith@example.com", age: 25 }
                      ]
                  },
                  {
                      id: 3,
                      name: "Artificial Intelligence",
                      students: [
                          { id: 4, name: "Alice Johnson", email: "alicejohnson@example.com", age: 21 }
                      ]
                  }
              ]
          },
          {
              id: 2,
              name: "Department of Mathematics",
              specializations: [
                  {
                      id: 4,
                      name: "Pure Mathematics",
                      students: [
                          { id: 5, name: "Mike Brown", email: "mikebrown@example.com", age: 24 }
                      ]
                  },
                  {
                      id: 5,
                      name: "Applied Mathematics",
                      students: [
                          { id: 6, name: "Emily Davis", email: "emilydavis@example.com", age: 23 }
                      ]
                  }
              ]
          }
      ]
  },
  {
      id: 2,
      name: "Punjab University",
      departments: [
          {
              id: 3,
              name: "Department of Languages",
              specializations: [
                  {
                      id: 6,
                      name: "English",
                      students: [
                          { id: 7, name: "David Lee", email: "davidlee@example.com", age: 26 }
                      ]
                  },
                  {
                      id: 7,
                      name: "Urdu",
                      students: [
                          { id: 8, name: "Ayesha Khan", email: "ayeshakhan@example.com", age: 22 }
                      ]
                  },
                  {
                      id: 8,
                      name: "Spanish",
                      students: [
                          { id: 9, name: "Sofia Rodriguez", email: "sofiarodriguez@example.com", age: 25 }
                      ]
                  }
              ]
          }
      ]
  },
  {
      id: 3,
      name: "University of Lahore",
      departments: [
          {
              id: 4,
              name: "Department of Computer Science",
              specializations: [
                  {
                      id: 9,
                      name: "Data Science",
                      students: [
                          { id: 10, name: "Ahmed Ali", email: "ahmedali@example.com", age: 24 }
                      ]
                  },
                  {
                      id: 10,
                      name: "Software Engineering",
                      students: [
                          { id: 11, name: "Fatima Hassan", email: "fatimahassan@example.com", age: 23 }
                      ]
                  }
              ]
          }
      ]
  },
  {
      id: 4,
      name: "COMSATS",
      departments: [
          {
              id: 5,
              name: "Department of Computer Science",
              specializations: [
                  {
                      id: 11,
                      name: "Data Science",
                      students: [
                          { id: 12, name: "Muhammad Khan", email: "muhammadkhan@example.com", age: 25 }
                      ]
                  },
                  {
                      id: 12,
                      name: "Software Engineering",
                      students: [
                          { id: 13, name: "Ayesha Ahmed", email: "ayeshaahmed@example.com", age: 22 }
                      ]
                  }
              ]
          }
      ]
  }
];

function populateUniversities() {
  const universitySelect = document.getElementById('university');
  for (let i = 0; i < universities.length; i++) {
      const option = document.createElement('option');
      option.value = universities[i].id;
      option.text = universities[i].name;
      universitySelect.appendChild(option);
  }
}

function populateDepartments() {
  const universitySelect = document.getElementById('university');
  const departmentSelect = document.getElementById('department');
  const universityId = parseInt(universitySelect.value);

  departmentSelect.innerHTML = '<option value="">--Select Department--</option>';
  document.getElementById('specialization').innerHTML = '<option value="">--Select Specialization--</option>'; 

  if (universityId) {
      const selectedUniversity = universities.find(u => u.id === universityId);
      for (let i = 0; i < selectedUniversity.departments.length; i++) {
          const option = document.createElement('option');
          option.value = selectedUniversity.departments[i].id;
          option.text = selectedUniversity.departments[i].name;
          departmentSelect.appendChild(option);
      }
  }
}

function populateSpecializations() {
  const universitySelect = document.getElementById('university');
  const departmentSelect = document.getElementById('department');
  const specializationSelect = document.getElementById('specialization');
  const universityId = parseInt(universitySelect.value);
  const departmentId = parseInt(departmentSelect.value);

  specializationSelect.innerHTML = '<option value="">--Select Specialization--</option>';

  if (universityId && departmentId) {
      const selectedUniversity = universities.find(u => u.id === universityId);
      const selectedDepartment = selectedUniversity.departments.find(d => d.id === departmentId);
      for (let i = 0; i < selectedDepartment.specializations.length; i++) {
          const option = document.createElement('option');
          option.value = selectedDepartment.specializations[i].id;
          option.text = selectedDepartment.specializations[i].name;
          specializationSelect.appendChild(option);
      }
  }
}

function showStudents() {
  const universitySelect = document.getElementById('university');
  const departmentSelect = document.getElementById('department');
  const specializationSelect = document.getElementById('specialization');
  const universityId = parseInt(universitySelect.value);
  const departmentId = parseInt(departmentSelect.value);
  const specializationId = parseInt(specializationSelect.value);
  const tableBody = document.getElementById('tableBody');
  const table = document.getElementById('studentsTable');

  tableBody.innerHTML = ''; // Clear previous table data

  if (universityId && departmentId && specializationId) {
      const selectedUniversity = universities.find(u => u.id === universityId);
      const selectedDepartment = selectedUniversity.departments.find(d => d.id === departmentId);
      const selectedSpecialization = selectedDepartment.specializations.find(s => s.id === specializationId);

      for (let i = 0; i < selectedSpecialization.students.length; i++) {
          const student = selectedSpecialization.students[i];
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${student.id}</td>
              <td>${student.name}</td>
              <td>${student.email}</td>
              <td>${student.age}</td>
          `;
          tableBody.appendChild(row);
      }

      table.style.display = 'table';
  } else {
      table.style.display = 'none';
  }
}

// Call this function when the page loads to populate the universities dropdown
window.onload = function() {
  populateUniversities();
};