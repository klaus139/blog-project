import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
import { apiGet } from '../../utils/api/axios';

const Category = () => {
    const { categoryId } = useParams();
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchArticlesByCategory = async () => {
        try {
          const res = await apiGet(`articles/category/${categoryId}`);
          setArticles(res.data.data);
        } catch (error) {
          setError("Failed to fetch articles");
          toast.error(error.message);
        }
      };
      fetchArticlesByCategory();
    }, [categoryId]);
  
    return (
      <div>
        <h1>Articles in Category {categoryId}</h1>
        {articles.map((article) => (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    );
  };
  
export default Category;