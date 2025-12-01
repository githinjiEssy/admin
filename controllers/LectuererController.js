import Lecturer from "../models/Lecturer.js";

// GET all lecturers
export const getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET lecturer by ID
export const getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    if (!lecturer) return res.status(404).json({ message: "Lecturer not found" });
    res.json(lecturer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};