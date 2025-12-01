import Issue from "../models/Issue.js";
import Student from "../models/student.js";
import Lecturer from "../models/Lecturer.js";

// GET all issues 
export const getIssues = async (req, res) => {
  try {
    const { studentId, lecturerId, status, priority } = req.query;
    const filter = {};
    
    if (studentId) filter.student = studentId;
    if (lecturerId) filter.lecturer = lecturerId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const issues = await Issue.find(filter)
      .populate('student', 'firstName lastName email schoolID')
      .populate('lecturer', 'name email course')
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('student', 'firstName lastName email schoolID')
      .populate('lecturer', 'name email course')
      .populate('resolvedBy', 'name email');
    
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET issues by lecturer ID
export const getLecturerIssues = async (req, res) => {
  try {
    const { lecturerId } = req.params;
    
    const issues = await Issue.find({ lecturer: lecturerId })
      .populate('student', 'firstName lastName email schoolID')
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update issue status
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution, resolvedBy } = req.body;
    
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    
    const updateData = { status };
    
    if (status === 'resolved' || status === 'rejected') {
      updateData.resolution = resolution;
      updateData.resolvedBy = resolvedBy;
      updateData.resolvedAt = new Date();
    }
    
    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate('student', 'firstName lastName email schoolID')
      .populate('lecturer', 'name email course')
      .populate('resolvedBy', 'name email');
    
    res.json(updatedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update issue priority
export const updateIssuePriority = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { priority } = req.body;
    
    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      { priority },
      { new: true }
    )
      .populate('student', 'firstName lastName email schoolID')
      .populate('lecturer', 'name email course');
    
    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    
    res.json(updatedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET issue statistics
export const getIssueStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await Issue.countDocuments();
    const priorityStats = await Issue.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      total,
      statusStats: stats,
      priorityStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};