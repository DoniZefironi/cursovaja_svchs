require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String },
    phone_number: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: String, default: "USER" },
    position: { type: String }
});

const refreshTokenSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refresh_token: { type: String, required: true }
});

const subjectSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String }
});

const syllabusSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    syllfile: { type: String, required: true },
    name: { type: String }
});

const formStudySchema = new mongoose.Schema({
    type: { type: String, required: true }
});

const typeMethodSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const specialitySchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    qualification: { type: String, required: true }
});

const methodologicalRecSchema = new mongoose.Schema({
    date_realese: { type: Date, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    year_create: { type: Number, required: true },
    url: { type: String, required: true },
    quantity_pages: { type: Number, required: true }
});

const userMethodologicalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    methodologicalRecId: { type: mongoose.Schema.Types.ObjectId, ref: 'MethodologicalRec', required: true }
});

const specialityMethodSchema = new mongoose.Schema({
    specialityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality', required: true },
    methodologicalRecId: { type: mongoose.Schema.Types.ObjectId, ref: 'MethodologicalRec', required: true }
});

const User = mongoose.model('User', userSchema);
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Syllabus = mongoose.model('Syllabus', syllabusSchema);
const FormStudy = mongoose.model('FormStudy', formStudySchema);
const TypeMethod = mongoose.model('TypeMethod', typeMethodSchema);
const Speciality = mongoose.model('Speciality', specialitySchema);
const MethodologicalRec = mongoose.model('MethodologicalRec', methodologicalRecSchema);
const UserMethodological = mongoose.model('UserMethodological', userMethodologicalSchema);
const SpecialityMethod = mongoose.model('SpecialityMethod', specialityMethodSchema);

module.exports = {
    User,
    Subject,
    Syllabus,
    FormStudy,
    TypeMethod,
    Speciality,
    MethodologicalRec,
    UserMethodological,
    SpecialityMethod,
    RefreshToken
};