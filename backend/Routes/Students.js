const ensureAuthenticated = require('../Middlewears/Auth');
const router = require('express').Router();


const Student = require("../Models/Student");

router.route("/add").post(ensureAuthenticated, async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            rollNumber,  
            deptName,   
            regNumber, 
            year,        
            age, 
            gender, 
            address, 
            contactNumber 
        } = req.body;

        const newStudent = new Student({
            firstName,
            lastName,
            rollNumber,  
            deptName,    
            regNumber: Number(regNumber),
            year: Number(year), 
            age: Number(age),
            gender,
            address,
            contactNumber: Number(contactNumber)
        });

        await newStudent.save();
        res.status(200).json({ status: "success", message: "Student Added." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Error with saving data" });
    }
});


router.route("/").get(ensureAuthenticated,async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error with fetching data"});
    }
});

router.route("/update/:id").put(ensureAuthenticated,async (req, res) => {
    try {
        let userId = req.params.id;
        const { firstName, lastName,rollNumber,deptName,year, regNumber, age, gender, address, contactNumber } = req.body;

        const updateStudent = {
            firstName,
            lastName,
            rollNumber,
            deptName,
            year,
            regNumber: Number(regNumber),
            age: Number(age),
            gender,
            address,
            contactNumber: Number(contactNumber)
        };

        const update = await Student.findByIdAndUpdate(userId, updateStudent);
        res.status(200).send({status: "User Updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    }
});

router.route("/delete/:id").delete(ensureAuthenticated,async (req, res) => {
    try {
        let userId = req.params.id;

        await Student.findByIdAndDelete(userId);

        res.status(200).send({status: "User Deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with Deleting data", error: err.message});
    }
});


router.post("/login", async (req, res) => {
    try {
        const { regNumber } = req.body;

        if (!regNumber) {
            return res.status(400).json({ message: 'Registration number is required', success: false });
        }

        const student = await Student.findOne({ regNumber }).lean();
        if (!student) {
            return res.status(403).json({ message: 'Auth failed, invalid registration number', success: false });
        }

        const {_id,firstName,lastName,rollNumber, deptName, year, age, gender, address, contactNumber } = student;

        res.status(200).json({
            message: "Login Success", 
            success: true, 
            regNumber, 
            firstName,
            name: firstName+" "+lastName,
            rollNumber,
            deptName,
            year,
            age,
            gender,
            address,
            contactNumber,
            studentId: _id 
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Internal server error", success: false });
    }
});

router.route("/get/:id").get(ensureAuthenticated,async (req, res) => {
    try {
        let userId = req.params.id;
        const user = await Student.findById(userId);
        res.status(200).send({ status: "User Fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with Fetching data", error: err.message });
    }
});

router.route("/count").get(ensureAuthenticated,async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).send({status: "Successfully Counted", count: count});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with Counting Data", error: err.message});
    }
});


module.exports = router;
