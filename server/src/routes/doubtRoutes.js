const router = require("express").Router()
const {createDoubt, readDoubt, updateDoubt, deleteDoubt, getAllDoubts, getMyDoubts, updateDoubtStatus} = require("../controllers/doubtController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", authMiddleware, roleMiddleware('student'),upload.single("image"), createDoubt)
router.get("/", authMiddleware , roleMiddleware("student") , getMyDoubts)

router.get("/all-doubts", authMiddleware, roleMiddleware('mentor'), getAllDoubts)
router.put("/status/:id" , authMiddleware , roleMiddleware('mentor') , updateDoubtStatus)

router.get('/:id', authMiddleware, readDoubt)
router.put("/:id" , authMiddleware, roleMiddleware('student'), updateDoubt)
router.delete("/:id" , authMiddleware, roleMiddleware('student'), deleteDoubt)

module.exports = router