import  Student from'../models/student.js';
import Mentor  from '../models/mentor.js';

 const checkStudentMentor = async (req, res, next) => {
    const { studentId, mentorId } = req.body;

    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (student && student.mentor) {
        return res.status(400).json({ message: 'Student already has a mentor' });
    }

    if (mentor && mentor.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student is already assigned to this mentor' });
    }

    next();
};

export default {
    checkStudentMentor
}