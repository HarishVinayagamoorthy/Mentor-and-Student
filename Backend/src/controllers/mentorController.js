import Mentor from "../models/mentor.js";
import Student from "../models/student.js";
const createMentor = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).send({ message: "fill the required field" });
    }

    const existingMentor = await Mentor.findOne({ name });
    if (existingMentor) {
      return res
        .status(400)
        .json({ error: "Mentor with the same name already exists." });
    } else {
      const mentor = new Mentor({ name });
      await mentor.save();
      res.json({ message: "Mentor created successfully", mentor });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "error occuried:", error });
  }
};

// const assignStudentToMentor = async (req, res) => {
//   const { studentId, mentorId } = req.body;
//   try {
//     if (!studentId || !mentorId) {
//       res.status(400).send({ message: "Some Input Field is missing" });
//     }

//     else {
//       const student = await Student.findByIdAndUpdate(studentId, {
//         mentor: mentorId,
//       });
//       const mentor = await Mentor.findByIdAndUpdate(mentorId, {
//         $push: { students: studentId },
//       });

//       res.json({ message: "Student assigned to Mentor successfully", mentor });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const assignStudentToMentor = async (req, res) => {
  const { studentId, mentorId } = req.body;
  try {
    if (!studentId || !mentorId) {
      return res.status(400).json({ message: "Some Input Field is missing" });
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true } // Return the updated document
    );

    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { students: studentId } },
      { new: true } // Return the updated document
    );

    res.json({ message: "Student assigned to Mentor successfully", mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getMentorStudents = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId).populate("students");
    res.json(mentor.students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createMentor,
  assignStudentToMentor,
  getMentorStudents,
};
