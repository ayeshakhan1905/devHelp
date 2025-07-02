const { postComment, getAllComments, deleteComment } = require("../controllers/commentControllers")
const authMiddleware = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/:id" , authMiddleware, postComment)
router.get("/:id" , authMiddleware , getAllComments)
router.delete("/:id", authMiddleware, deleteComment);


module.exports = router