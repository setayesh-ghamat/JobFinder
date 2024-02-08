const expressApply = require('express');
const routerApply = expressApply.Router();
const dbApply = require('../db/database.ts')
import path from 'path';
const transporter = require("../mailer/nodemailer.ts");
import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


// Define where and how to save the uploaded files
const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
      callback(null, path.join(__dirname, '../uploads')) // Specify the destination folder
    },
    filename: (
      req: Request, 
      file: Express.Multer.File, 
      callback: FileNameCallback
    ): void => {
      callback(null, Date.now() + '-' + file.originalname) // Specify the filename
    }
});

// console
  
const upload = multer({ 
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (
      request: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback
    ): void => {
      // Define allowed file types using a regex pattern
      const filetypes = /pdf/; 
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return callback(null, true);
      }
      callback(null, false)
    }
});
  
// Apply invited user
routerApply.post("/api/apply/job/:id", upload.single('cv'), (req: { params: { id: any; }; body: { mail: any; pseudo: any; connected:string}; file: { path: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: any; er?: any; success?: boolean; message?: string; }): any; new(): any; }; }; }) => {
    const jobId = req.params.id;
    const {mail, pseudo, connected} = req.body;
    const fileLink = req.file.path;

    
    if (!jobId || !mail || !pseudo || !fileLink) {
      return res.status(400).json({ error: "Required data missing." });
    }
    if (connected !== 'true'){
      
      const query1 = `INSERT INTO Users (mail, pseudo, status) VALUES (?, ?, ?)`;
      dbApply.query(query1, [mail, pseudo, 'INVITED'], (err: { message: any; }) => {
        if (err) {
          return res.status(500).json({ error: "Error inserting user.",er: err.message });
        }
      
        const query2 = `SELECT MAX(id_user) FROM Users`;
        dbApply.query(query2, (err: { message: any; }, result: { [x: string]: any; }[]) => {
          if (err) {
            return res.status(500).json({ error: "Error inserting into apply.",er: err.message });
          }
          const userId = result[0]['MAX(id_user)'];
          
          const query3 = `INSERT INTO apply (id_job, id_user, mail_sent, cv) VALUES (?, ?, ?, ?)`;
          dbApply.query(query3, [jobId, userId, false, fileLink], (err: { message: any; }) => {
            if (err) {
              return res.status(500).json({ error: "Error inserting into apply.",er: err.message });
            }
            
            // Send confirmation email to the user
            const mailOptions = {
              from: 'no-reply@job-finder.com',   // sender's email address
              to: mail,                      // recipient's email address
              subject: 'Job Application Confirmation',
              text: `Hello ${pseudo},\n\nThank you for applying for the job with ID: ${jobId}. We have received your CV and will get back to you shortly.`
            };
            
            transporter.sendMail(mailOptions, (err: { message: any; }, info: any) => {
              if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ success: false, message: "User applied but confirmation email failed.", error: err.message });
              } else {
                // Update the mail_sent column to true in the apply table
                const query4 = `UPDATE apply SET mail_sent = true WHERE id_job = ? AND id_user = ?`;
                dbApply.query(query4, [jobId, userId], (err: { message: any; }) => {
                  if (err) {
                    console.error('Error updating mail_sent column:', err);
                    return res.status(500).json({ success: false, message: "Email sent but failed to update the mail_sent column.", error: err.message });
                  }
                  return res.status(200).json({ success: true, message: "User applied and confirmation email sent successfully." });
                }) 
              }
            })
          })
        })
      });
    }else{

      const query2 = `SELECT Users.id_user FROM Users WHERE mail = ?`;
      dbApply.query(query2, [mail], (err: { message: any; }, result: { [x: string]: any; }[]) => {
        if (err) {
          return res.status(500).json({ error: "Error inserting into apply.",er: err.message });
        }
        const userId = result[0]['id_user'];

        const query3 = `INSERT INTO apply (id_job, id_user, mail_sent, cv) VALUES (?, ?, ?, ?)`;
        dbApply.query(query3, [jobId, userId, false, fileLink], (err: { message: any; }) => {
          if (err) {
            return res.status(500).json({ error: "Error inserting into apply.",er: err.message });
          }
          
          // Send confirmation email to the user
          const mailOptions = {
            from: 'no-reply@job-finder.com',   // sender's email address
            to: mail,                      // recipient's email address
            subject: 'Job Application Confirmation',
            text: `Hello ${pseudo},\n\nThank you for applying for the job with ID: ${jobId}. We have received your CV and will get back to you shortly.`
          };
          
          transporter.sendMail(mailOptions, (err: { message: any; }, info: any) => {
            if (err) {
              console.error('Error sending email:', err);
              return res.status(500).json({ success: false, message: "User applied but confirmation email failed.", error: err.message });
            } else {
              // Update the mail_sent column to true in the apply table
              const query4 = `UPDATE apply SET mail_sent = true WHERE id_job = ? AND id_user = ?`;
              dbApply.query(query4, [jobId, userId], (err: { message: any; }) => {
                if (err) {
                  console.error('Error updating mail_sent column:', err);
                  return res.status(500).json({ success: false, message: "Email sent but failed to update the mail_sent column.", error: err.message });
                }
                return res.status(200).json({ success: true, message: "User applied and confirmation email sent successfully." });
              }) 
            }
          })
        })
      })
    }
});

module.exports = routerApply;