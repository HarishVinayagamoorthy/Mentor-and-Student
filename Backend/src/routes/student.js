import express from "express";
import studentController from "../controllers/studentController.js";
import Auth from "../common/Auth.js";

const router = express.Router();
router.post("/create", studentController.createStudent);
router.post(
  "/assign-mentor",
  Auth.checkStudentMentor,
  studentController.assignMentorToStudent
);
router.get("/previous-mentor/:studentId", studentController.getPreviousMentor);

export default router;
