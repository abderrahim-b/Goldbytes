require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/db');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require('./Routes/Authroutes');
const feedPostRoutes = require('./Routes/FeedPostroutes');
const feedCommentRoutes = require('./Routes/FeedCommentroutes');
const challengeRoutes = require('./Routes/Challengeroutes');
const submissionRoutes = require('./Routes/Submissionroutes');


const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/feed', feedPostRoutes);
app.use('/api/feedcomments', feedCommentRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
