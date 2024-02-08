import expressAuth from 'express';
import { Request, Response } from 'express';
import { generateToken } from '../models/JWT';

const routerAuth = expressAuth.Router();
const dbAuth = require('../db/database.ts')
const bcrypt = require('bcrypt');
const { use } = require("bcrypt/promises");
const cookieParser = require('cookie-parser');

const saltRounds = 10;
const appAuth = expressAuth();
routerAuth.use(cookieParser());

// Hash a password
const hashPassword = async (plainPassword: any) => {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
};
  
// Verify a password
const verifyPassword = async (plainPassword: any, hashedPassword: any) => {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;  // returns true if matching, false otherwise
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
};
  
// register user
routerAuth.post("/api/register/user", (req: Request, res: Response) => {
  const { pseudo, mail, password, passwordconfirm} = req.body;

  const query1 = "SELECT Users.mail FROM Users WHERE mail = ?"
  dbAuth.query(query1, [mail], async (error: { message: any; }, result: string | any[]) => {
    if (error) {
      console.error("Error fetching user from the database:", error);
      return res.status(500).json({ success: false, error: error.message } as ApiResponse);
    }
    const userMail = result[0];
    if (!userMail){
      const query2 = "INSERT INTO Users (pseudo, mail, password, status) VALUES (?, ?, ?, ?)";
      
      if (password === passwordconfirm){
        
        (async () => {
          const hashed = await hashPassword(password);
          
          dbAuth.query(query2, [pseudo, mail, hashed, 'ACTIVE'], (error: { message: any; }) => {
            if (error) {
              console.error("Error inserting data into the database:", error);
              return res.status(500).json({ success: false, error: error.message });
            }
            res.status(200).json({ success: true, redirectTo: '/' });
          });
        })();
        
      } else {
        res.status(400).json({ success: false, message: "Passwords do not match." });
      }
    }else{
      const query3 = "UPDATE Users SET pseudo = ?, password = ?, status = ? WHERE mail = ?";
      
      if (password === passwordconfirm){
        
        (async () => {
          const hashed = await hashPassword(password);
          
          dbAuth.query(query3, [pseudo, hashed, 'ACTIVE', mail], (error: { message: any; }) => {
            if (error) {
              console.error("Error inserting data into the database:", error);
              return res.status(500).json({ success: false, error: error.message });
            }
            res.status(200).json({ success: true, redirectTo: '/' });
          });
        })();
        
      } else {
        res.status(400).json({ success: false, message: "Passwords do not match." });
      }
    }
  })
});

type ApiResponse = {
  success: boolean;
  error?: any;
  message?: string;
  token?: string;
  redirectTo?: string;
};

// login user
routerAuth.post("/api/login/user", async (req: Request, res: Response) => {
  const { mail, password } = req.body;

  if (password !== 'INVITED_USER_PASS'){

    
    // Fetch user by email from the database
    const query = "SELECT * FROM Users WHERE mail = ?";
    
    dbAuth.query(query, [mail], async (error: { message: any; }, results: string | any[]) => {
      if (error) {
        console.error("Error fetching user from the database:", error);
        return res.status(500).json({ success: false, error: error.message } as ApiResponse);
      }
      
      // If no user found, send an error response
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid email or password" } as ApiResponse);
      }
      
      const user = results[0];
      
      // Verify the provided password with the hashed password in the database
      const isMatch = await verifyPassword(password, user.password);
      if (isMatch) {
        
        const token = generateToken(user);
        // Set the JWT as an HTTP-only cookie
        try {
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: "lax",
            // secure: true,  // Uncomment this line if you're using HTTPS
            maxAge: 3600000,  // 1 hour in milliseconds
          } as any);
        } catch (error) {
          console.error("Error setting the cookie:", error);
          // Handle the error accordingly, such as sending a response to the client.
          res.status(500).json({ success: false, message: 'Error setting the cookie' });
        }
        res.status(200).json({ success: true, user: {pseudo: user.pseudo, mail: user.mail, role: user.role} } as ApiResponse);
      } else {
        // Passwords do not match, send an error response
        res.status(400).json({ success: false, message: "Invalid email or password" } as ApiResponse);
      }
    });
  }else{
    res.status(400).json({ success: false, message: "Invalid password" } as ApiResponse);
  }
});

// logout
routerAuth.post("/api/logout/user", (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600000,
  } as any)
  res.status(200).json({ success: true });
});

// protected route
// routerAuth.get("/api/protected/route", verifyJWT, (req: { user: any; }, res: { json: (arg0: { message: string; user: any; }) => void; }) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = routerAuth;