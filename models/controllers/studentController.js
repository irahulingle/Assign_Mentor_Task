const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student({ name: req.body.name });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error creating student' });
  }
};

// Assign or change mentor for a student
exports.assignMentorToStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const newMentor = await Mentor.findById(req.body.mentorId);

    if (!student) return res.status(404).json({ error: 'Student not found' });
    if (!newMentor) return res.status(404).json({ error: 'Mentor not found' });

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = newMentor._id;
    await student.save();

    newMentor.students.push(student._id);
    await newMentor.save();

    res.status(200).json({ message: 'Mentor assigned', student });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning mentor' });
  }
};

// Get all students without a mentor
exports.getStudentsWithoutMentor = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Get previously assigned mentors for a student
exports.getPreviousMentors = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student.previousMentors);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching previous mentors' });
  }
};
