import jwt from 'jsonwebtoken';
import express from 'express';

function verifyToken(req, res, next) 
{
    const token = req.headers('Autorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied!' });

    }
    try{ 
        const decoded = jwt.verify(token, 'secretKey');
        req.doctorid = decoded.doctorid;
        next();

        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

export default verifyToken;

