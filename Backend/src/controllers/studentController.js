import Student from "../models/student.js";
import Mentor from "../models/mentor.js";

const createStudent = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).send({ message: "fill the required field" });
    }
    const existingStudent = await Student.findOne({ name });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Student with the same name already exists." });
    } else {
      const student = new Student({ name });
      await student.save();
      res.json({ message: "Student created successfully", student });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "error occuried:", error });
  }
};

// const assignMentorToStudent = async (req, res) => {
//   try {
//     const { studentId, mentorId } = req.body;

//     const student = await Student.findByIdAndUpdate(studentId, {
//       $push: { mentor: mentorId },
//     });
//     const mentor = await Mentor.findByIdAndUpdate(mentorId, {
//       $push: { students: studentId },
//     });

//     res.json({
//       message: "Mentor assigned to Student successfully",
//       mentor,
//       student,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const assignMentorToStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const student = await Student.findOneAndUpdate(
      { _id: studentId },
      { $set: { mentor: mentorId } },
      { new: true } // This ensures that you get the updated document
    );

    const mentor = await Mentor.findOneAndUpdate(
      { _id: mentorId },
      { $push: { students: studentId } },
      { new: true }
    ).populate("students"); // This populates the students array in the mentor document

    res.json({
      message: "Mentor assigned to Student successfully",
      student,
      mentor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPreviousMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("mentor");
    res.json(student.mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createStudent,
  assignMentorToStudent,
  getPreviousMentor,
};
