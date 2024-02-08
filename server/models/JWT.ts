const jwt = require('jsonwebtoken');

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// generate token
export function generateToken(user: { id: number; pseudo: string; email: string; role: string}) {
  // You can decide what you want to include in the token payload (the second argument to sign). 
  // Here we're including the user ID and email.
  return jwt.sign({ id: user.id, pseudo: user.pseudo, email: user.email, role: user.role }, jwtSecret, { expiresIn: '1h' });
}

// JWT verify
export function verifyJWT(req: {
    cookies: any; headers: { [x: string]: any; }; user: any; 
  }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) {
  
  const token = req.cookies.token;

  if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
      if (err) {
          return res.status(500).json({ message: 'Failed to authenticate token.' });
      }

      // If successfully verified, set the decoded payload to req.user and proceed
      req.user = decoded;
      next();
  });
}