const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a new mentor
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor({ name: req.body.name });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: 'Error creating mentor' });
  }
};

// Get all students assigned to a mentor
exports.getStudentsByMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
    res.status(200).json(mentor.students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Assign multiple students to a mentor
exports.assignStudentsToMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const studentIds = req.body.students;

    for (let studentId of studentIds) {
      const student = await Student.findById(studentId);

      if (!student.mentor) {
        student.mentor = mentor._id;
        await student.save();
        mentor.students.push(student._id);
      }
    }

    await mentor.save();
    res.status(200).json({ message: 'Students assigned to mentor', mentor });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning students' });
  }
};


console.log("Hello Node")