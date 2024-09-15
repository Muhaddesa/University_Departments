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

const universitySelect = document.getElementById('university');
const departmentSelect = document.getElementById('department');
const specializationSelect = document.getElementById('specialization');
const studentTableBody = document.querySelector('#studentTable tbody');

// Populate universities dropdown
function populateUniversities() {
  universities.forEach(university => {
    const option = document.createElement('option');
    option.value = university.id;
    option.textContent = university.name;
    universitySelect.appendChild(option);
  });
}

// Populate departments based on selected university
function populateDepartments(universityId) {
  departmentSelect.innerHTML = '<option value="">All Departments</option>';
  specializationSelect.innerHTML = '<option value="">All Specializations</option>';
  specializationSelect.disabled = true;

  const university = universities.find(u => u.id == universityId);

  if (university) {
    university.departments.forEach(department => {
      const option = document.createElement('option');
      option.value = department.id;
      option.textContent = department.name;
      departmentSelect.appendChild(option);
    });
    departmentSelect.disabled = false;
  } else {
    departmentSelect.disabled = true;
  }
}

// Populate specializations based on selected department
function populateSpecializations(departmentId) {
  specializationSelect.innerHTML = '<option value="">All Specializations</option>';

  const university = universities.find(u => u.id == universitySelect.value);
  const department = university?.departments.find(d => d.id == departmentId);

  if (department) {
    department.specializations.forEach(spec => {
      const option = document.createElement('option');
      option.value = spec.id;
      option.textContent = spec.name;
      specializationSelect.appendChild(option);
    });
    specializationSelect.disabled = false;
  } else {
    specializationSelect.disabled = true;
  }
}

// Show students based on filters
function showStudents() {
  studentTableBody.innerHTML = '';

  const universityId = universitySelect.value;
  const departmentId = departmentSelect.value;
  const specializationId = specializationSelect.value;

  let students = [];

  universities.forEach(university => {
    if (!universityId || university.id == universityId) {
      university.departments.forEach(department => {
        if (!departmentId || department.id == departmentId) {
          department.specializations.forEach(spec => {
            if (!specializationId || spec.id == specializationId) {
              students = students.concat(spec.students);
            }
          });
        }
      });
    }
  });

  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td><td>${student.email}</td><td>${student.age}</td>`;
    studentTableBody.appendChild(row);
  });
}

// Event listeners
universitySelect.addEventListener('change', function() {
  populateDepartments(this.value);
  showStudents();
});

departmentSelect.addEventListener('change', function() {
  populateSpecializations(this.value);
  showStudents();
});

specializationSelect.addEventListener('change', function() {
  showStudents();
});

// Initial load
populateUniversities();
showStudents();
