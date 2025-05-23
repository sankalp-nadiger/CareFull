import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Add user info to request
        req.user = decoded;
        return true;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        } else {
            console.error('Auth middleware error:', error);
            res.status(500).json({ message: 'Authentication failed' });
        }
        return false;
    }
};

/**
 * Middleware to authenticate any user requests using JWT
 */
export const userAuth = async (req, res, next) => {
    if (await verifyToken(req, res, next)) {
        next();
    }
};

/**
 * Middleware to authenticate pharmacist requests using JWT
 * Checks if the user has the pharmacist role
 */
export const pharmacistAuth = async (req, res, next) => {
    if (await verifyToken(req, res, next)) {
        // Check if user is a pharmacist
        if (req.user.role !== 'pharmacist') {
            return res.status(403).json({ message: 'Access denied. Pharmacist access required.' });
        }
        next();
    }
};