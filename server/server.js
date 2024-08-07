const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/memberResolvers');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

class Server {
  constructor() {
    this.app = app;

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    this.startServer();
    this.createRoutes();
  }

  createRoutes() {
    // File upload endpoint
    this.app.post('/upload', upload.single('file'), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      res.status(200).json({ filename: req.file.filename });
    });
  }

  async startServer() {
    await this.server.start();
    this.server.applyMiddleware({ app: this.app });

    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

    const PORT = process.env.PORT || 6001;
    this.app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${this.server.graphqlPath}`);
    });
  }
}

const server = new Server();
