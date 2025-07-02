const { validationResult } = require("express-validator");
const doubtModel = require("../models/doubtModel");

// Create Doubt (Student)
const createDoubt = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Missing required fields!", success: false });
        }

        const doubt = await doubtModel.create({
            title,
            description,
            student: req.user._id,
            image: req.file?.path || ""
        });

        res.status(201).json({
            message: "Doubt posted successfully",
            success: true,
            doubt
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read Single Doubt
const readDoubt = async (req, res) => {
    try {
        const doubt = await doubtModel.findById(req.params.id).populate("student", "userName email");
        if (!doubt) {
            return res.status(404).json({
                message: "Doubt not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Doubt found",
            success: true,
            doubt
        });

    } catch (err) {
        console.error("Error in readDoubt:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update Doubt (Student can edit their own)
const updateDoubt = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const doubt = await doubtModel.findOne({ _id: req.params.id, student: req.user._id });
        if (!doubt) {
            return res.status(404).json({ message: "Doubt not found", success: false });
        }

        const { title, description, status } = req.body;
        if (title) doubt.title = title;
        if (description) doubt.description = description;
        if (status) doubt.status = status;

        await doubt.save();

        res.status(200).json({
            message: "Doubt updated successfully",
            success: true,
            doubt
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Doubt (Student)
const deleteDoubt = async (req, res) => {
    try {
        const doubt = await doubtModel.findOneAndDelete({
            _id: req.params.id,
            student: req.user._id
        });

        if (!doubt) {
            return res.status(404).json({ message: "Doubt not found", success: false });
        }

        res.status(200).json({
            message: "Doubt deleted successfully",
            success: true
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Doubts (Mentor with optional filter & pagination)
const getAllDoubts = async (req, res) => {
    try {
        const { status = 'all', page = 1, limit = 10 } = req.query;
        const query = status !== 'all' ? { status } : {};

        const doubts = await doubtModel.find(query)
            .populate('student', '-password')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            message: "Doubts fetched successfully",
            success: true,
            doubts
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyDoubts = async(req , res)=>{
    try{
        const doubts = await doubtModel.find({student : req.user._id})
        console.log(req.user);
        
        res.status(200).json({
            message : "Doubts fetched successfully",
            success : true,
            doubts
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateDoubtStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedDoubt = await doubtModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedDoubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }

    res.status(200).json({
      message: "Doubt status updated successfully",
      success: true,
      updatedDoubt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createDoubt,
    readDoubt,
    updateDoubt,
    deleteDoubt,
    getAllDoubts,
    getMyDoubts,
    updateDoubtStatus
};
