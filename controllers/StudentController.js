import Student from "../models/student.js"; 

// GET all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find(); 
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("selections.lecturer");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};