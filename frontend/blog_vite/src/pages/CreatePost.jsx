import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/CreatePost.scss'

function CreatePost() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [img, setImg] = useState('');
  const [errorImg, setErrorImg] = useState('')
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('subtitle', subtitle);
    if (img) formData.append('img', img)
    if(imageFile) formData.append('image', imageFile)


    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        // { title, content, category, subtitle, img },
        { headers: {
           Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
        } }
      );
      console.log('Resposta do servidor:', response.data)
      navigate('/');
    } catch (err) {
      setError(err.response?.data.message || 'Erro ao criar post');
      setErrorImg(err.response?.data.message || 'Erro ao carregar imagem');
    }
  };

  return (
    <div className="row justify-content-center p-2">
      <div className="col-md-6">
        <h2>Criar Post</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subtítulo</label>
          <input
            type="text"
            className="form-control"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Conteúdo</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL da Imagem</label>
          <input
            type="text"
            className="form-control"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Ex: https://example.com/image.jpg"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUpload" className='form-label'>Carregar imagem</label>
          <input 
          type="file" 
          className="form-control" 
          id="imageUpload" 
          // value={LoadingImg} 
          onChange={(e) => setImageFile(e.target.files[0])} />
          {errorImg && <div className="alert alert-danger ">{errorImg}</div>}
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Publicar</button>
      </div>
    </div>
  );
}

export default CreatePost;