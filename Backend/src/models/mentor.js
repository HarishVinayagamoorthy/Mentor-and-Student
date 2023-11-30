import mongoose from  '../common/config.js'

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
});

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
