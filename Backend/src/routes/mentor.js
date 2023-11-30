import express from "express";
import mentorController from "../controllers/mentorController.js";
import Auth from "../common/Auth.js";

const router = express.Router();

router.post("/create", mentorController.createMentor);
router.post(
  "/assign-student",
  Auth.checkStudentMentor,
  mentorController.assignStudentToMentor
);
router.get("/mentor-students/:mentorId", mentorController.getMentorStudents);

export default router;
