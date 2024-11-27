const PORT=process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://team:SIANSHYO@cluster0.ccwlf.mongodb.net';

export {MONGODB_URI,PORT};

export const TOKEN_SECRET='some secret key';