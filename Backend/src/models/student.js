import mongoose from'../common/config.js';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
