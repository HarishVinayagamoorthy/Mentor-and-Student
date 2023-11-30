import express from 'express'
import MentorRouter from './mentor.js'
import StudentRouter from'./student.js'
const  router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Backend of Student And Mentor</h1>`)
})

router.use('/mentors',MentorRouter)
router.use('/students',StudentRouter)

export default router