const doubtModel = require("../models/doubtModel")

const commentModel = require("../models/commentModel")

const postComment = async(req , res)=>{
    const {id} = req.params
    const {text} = req.body
    try{
        const doubt = await doubtModel.findById(id)
        if(!doubt){
            return res.status(404).send("Doubt not found")
        }
        let comment = await commentModel.create({
            doubtId:id , text , userId: req.user.id
        })
        console.log(comment);
        comment = await comment.populate('userId', 'userName role');
        res.status(200).json({
            message : "Comment posted successfully",
            success : true,
            comment
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

const getAllComments = async(req , res)=>{
    const {id} = req.params
    try{
        const doubt = await doubtModel.findById(id)
        if(!doubt){
            return res.status(404).send("Doubt not found")
        }
        const allComments = await commentModel.find({doubtId : id}).populate("userId" , "userName role")
        res.status(200).json({
            message : "comments fetched successfully",
            success : true,
            allComments
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await commentModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    postComment,
    getAllComments,
    deleteComment
}