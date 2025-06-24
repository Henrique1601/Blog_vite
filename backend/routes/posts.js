const express = require('express');
const cloudinary = require('cloudinary').v2; // Correção de ortografia
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuração do Multer para armazenar temporariamente o arquivo
const storage = multer.diskStorage({
  destination: './uploads/', // Pasta temporária (crie-a manualmente se não existir)
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único
  },
});
const upload = multer({ storage: storage });

// Middleware para verificar token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Criar post
router.post('/', auth, upload.single('image'), async (req, res) => { // Ativado e alinhado com 'image'
  const { title, subtitle, content, category } = req.body;
  console.log('Dados recebidos:', { title, subtitle, content, category });
  console.log('Arquivo recebido:', req.file);
  let img = '';

  try {
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'posts',
      });
      img = uploadResponse.secure_url; // URL segura do Cloudinary
    } else if (req.body.img) {
      img = req.body.img; // Usa a URL fornecida, se existir
    }
    console.log(uploadResponse);

    const optimizeUrl = cloudinary.url(img, {
      fetch_format: 'auto',
      quality: 'auto',
    });
    console.log('URL otimizada:', optimizeUrl);
    const post = new Post({ title, subtitle, img, content, category, author: req.user.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ message: 'Erro ao criar post' });
  }
});

// Listar posts
router.get('/', async (req, res) => {
  const { title, category, subtitle } = req.query;
  let query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (category) query.category = category;
  if (subtitle) query.subtitle = { $regex: subtitle, $options: 'i' };
  console.log('Query:', query);
  try {
    const posts = await Post.find(query).populate('author', 'username');
    console.log('Posts encontrados com populate:', posts);
    res.json(posts);
  } catch (err) {
    console.error('Erro ao listar posts:', err);
    res.status(500).json({ message: 'Erro ao listar posts' });
  }
});

module.exports = router;