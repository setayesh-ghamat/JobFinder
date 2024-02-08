const expressCRUD = require('express');
const router = expressCRUD.Router();
const db = require('../db/database.ts')
import { verifyJWT } from '../models/JWT';


// Show all jobs
router.get("/", (req: any, res: { json: (arg0: any) => any; }) => {
    const q = "SELECT * FROM Job";

    db.query(q, (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});

// Show a specific job by ID
router.get("/api/job/:id", (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: any) => any; }) => {
    const jobId = req.params.id;
  
    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required." });
    }
    const q = `SELECT * FROM Job WHERE id_job = ?`;
    db.query(q, [jobId], (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});


// Admin part ------------------------------------------------------------------------------------------------------------------------------------


// add a job to Job table in db
router.post("/api/add/job", verifyJWT,(req: {
  user: any; body: { title: any; contract: any; mobility: any; publish_date: any; description: any; id_company: any; }; 
}, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; error?: any; message?: string; }): void; new(): any; }; }; }) => {

  // Extracting user role from the JWT payload
  // Assuming it is stored under req.user.role
  const userRole = req.user.role;

  // Check if the user role is admin
  if (userRole !== 'Admin') {
    return res.status(403).json({ success: false, message: "Access denied: only admins can add jobs." });
  }

  const { title, contract, mobility, publish_date, description, id_company } = req.body;

  const query = "INSERT INTO Job (title, contract, mobility, publish_date, description, id_company) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(query, [title, contract, mobility, publish_date, description, id_company], (error: { message: any; }, results: any) => {
      if (error) {
          console.error("Error inserting data into the database:", error);
          return res.status(500).json({ success: false, error: error.message });
      }
      res.status(200).json({ success: true, message: "Job added successfully!" });
  });
});

// Update a specific job by ID
router.post("/api/update/job/:id", verifyJWT, (req: {
  user: any; params: { id: any; }; body: { title: any; contract: any; mobility: any; description: any; id_company: any; }; 
}, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; success?: boolean; message?: string; }): any; new(): any; }; }; json: (arg0: any) => any; affectedRows: number; }) => {
  // Extracting user role from the JWT payload
  // Assuming it is stored under req.user.role
  const userRole = req.user.role;

  // Check if the user role is admin
  if (userRole !== 'Admin') {
    return res.status(403).json({ success: false, message: "Access denied: only admins can update jobs." });
  }

  const jobId = req.params.id;
  const { title, contract, mobility, description, id_company } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required." });
  }
  const query = "UPDATE Job SET title = ?, contract = ?, mobility = ?, description = ?, id_company = ? WHERE id_job = ?";
  db.query(query, [title, contract, mobility, description, id_company, jobId], (err: any, data: any) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    if (res.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res.json(data);
  });
});

// Delete a specific job by ID
router.post("/api/delete/job/:id", verifyJWT, (req: {
  user: any; params: { id: any; }; 
}, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; success?: boolean; message?: string; }): any; new(): any; }; }; json: (arg0: any) => any; }) => {
  // Extracting user role from the JWT payload
  // Assuming it is stored under req.user.role
  const userRole = req.user.role;

  // Check if the user role is admin
  if (userRole !== 'Admin') {
    return res.status(403).json({ success: false, message: "Access denied: only admins can delete jobs." });
  }
  
    const jobId = req.params.id;
  
    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required." });
    }
    const q = `DELETE FROM Job WHERE id_job = ?`;
    db.query(q, [jobId], (err: any, data: any) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});

module.exports = router;