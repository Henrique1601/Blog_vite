import { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/styles.scss'

function Home() {
  const [posts, setPosts] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subtitleFilter, setSubtitleFilter] = useState('')

  useEffect(() => {
    let query ;
    query = { title:titleFilter, category:categoryFilter, subtitle:subtitleFilter } 
    console.log('useEffect executado com:', { titleFilter, categoryFilter });
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          params: query })
          console.log('Resposta da API:', response.data);
        setPosts(response.data);
      } catch (err) {
        console.error('Erro ao buscar posts:', err.response?.data);
      }
    };
    fetchPosts();
  }, [titleFilter, categoryFilter, subtitleFilter]);

// Adicionar filtros novos como procurar por data, autor,se tem img ou não, etc.
  return (
    <div className='container-fluid '>
      <h1 className='text-left m-2 ' >Posts</h1>

      <div className="row g-3 mb-3 justify-content-center ">
        <div className="col-12 col-md-6 col-lg-4">
        <input
          type="text"
          list='datalistOptions'
          id='datalistOptions'
          className="form-control form-control-sm "
          placeholder="Filtrar por título"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        </div>

    {/*     <datalist id="datalistOptions">
          <option value="" />
          <option value="" />
          <option value="" />
          </datalist> */}

      <div className="col-12 col-md-6 col-lg-4">
        <input
          type="text"
          list='datalistOptions'
          id='datalistOptions'
          className="form-control form-control-sm "
          placeholder="Filtrar por categoria"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        </div>
           <datalist id="datalistOptions">
          <option value="Anime" />
          <option value="Jogos" />
          <option value="Manga" />
          </datalist>
   
      <div className="col-12 col-md-6 col-lg-4">
        <input 
          type="text"
          className='form-control form-control-sm'
          placeholder='Filtrar por subtítulo'
          value={subtitleFilter}
          onChange={(e) => setSubtitleFilter(e.target.value)}
        />
      </div>
   </div>
{posts.length > 0 ? ( 
  <div className="row row-cols-5 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center">
   {posts.map((post) => {
    // Define se o card será maior (2 colunas) com base no título
    const isLarger = ['', ''].includes(post.title);
    const colClass = isLarger ? 'g-2 col-12 col-md-5 col-lg-3' : ' g-2 col-12 col-md-5 col-lg-3';

    return (
      <div key={post._id} className={colClass}>
       <div className="card h-100  border-light ">    
         {post.img && (
          <img src={post.img} 
          className="card-img-top"
          alt={post.title}
          style={{objectFit: 'cover', height: '200px'}} />
        )} 
         <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
           <h6 className='card-subtitle mb-2 text-body-secondary text-muted'>{post.subtitle}</h6>
            <p className="card-text">{post.content.substring(0, 100)}...</p>
            <p className="card-text"><small>Categoria: {post.category}</small></p>
            <p className="card-text"><small>Autor:{post.author?.username || 'Desconhecido'}</small></p>     
            <div className="card-footer text-muted">
              <small className='' style={{float: 'right', color: 'gray'}}>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
                  </div>
                </div>
              </div>
        )
        })}
      </div>
      ):(
        <p className='text-center text-muted'>Nenhum post encontrado.</p>
    )}
    </div>
  
  );
}

export default Home;