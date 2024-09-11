const apiBaseUrl = 'https://your-render-app-url.com';  // Replace with your Render app URL

// Create a new mentor
function createMentor() {
  const mentorName = document.getElementById('mentorName').value;
  
  fetch(`${apiBaseUrl}/mentor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: mentorName })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('results').textContent = 'Mentor created: ' + JSON.stringify(data);
  })
  .catch(error => console.error('Error:', error));
}

// Create a new student
function createStudent() {
  const studentName = document.getElementById('studentName').value;
  
  fetch(`${apiBaseUrl}/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: studentName })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('results').textContent = 'Student created: ' + JSON.stringify(data);
  })
  .catch(error => console.error('Error:', error));
}

// Assign mentor to a student
function assignMentor() {
  const studentId = document.getElementById('studentId').value;
  const mentorId = document.getElementById('mentorId').value;
  
  fetch(`${apiBaseUrl}/student/${studentId}/mentor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mentorId: mentorId })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('results').textContent = 'Mentor assigned: ' + JSON.stringify(data);
  })
  .catch(error => console.error('Error:', error));
}

// Get students by mentor
function getStudentsByMentor() {
  const mentorId = document.getElementById('mentorIdForStudents').value;
  
  fetch(`${apiBaseUrl}/mentor/${mentorId}/students`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('results').textContent = 'Students: ' + JSON.stringify(data);
  })
  .catch(error => console.error('Error:', error));
}
