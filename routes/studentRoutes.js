const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent); // Create student
router.post('/:studentId/mentor', studentController.assignMentorToStudent); // Assign or change mentor
router.get('/without-mentor', studentController.getStudentsWithoutMentor); // Get students without a mentor
router.get('/:studentId/previous-mentors', studentController.getPreviousMentors); // Get previous mentors

module.exports = router;
