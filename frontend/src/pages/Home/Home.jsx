import React, {useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';
import axios from 'axios'
import { apiGet } from '../../utils/api/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const cat = useLocation().search
  
  useEffect(()=> {
    const fetchData = async() => {
      try{
        const res = await apiGet(`post`);
        setPosts(res.data.data);
        const category = await apiGet(`categories`);
        setCategories(category.data.data);
         console.log(res)
        // console.log(category)

      }catch(error){
        console.log(error)
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent;
    const truncatedText = text.slice(0, 200);
    return truncatedText;
  }
  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.title : '';
  };

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.image} alt={post.title} />
              </div>
              <div className='content'>
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <div>
                <p>{getText(post.body)}</p>
                <p>{post.author.name}</p>
                <p>Category: {getCategoryName(post.category)}</p>
                </div>
                <Link to={`/post/${post._id}`}>
  <button>Read More</button>
</Link>
              </div>
            </div>
          
        ))}
      </div>
    </div>
  )

}

export default Home
