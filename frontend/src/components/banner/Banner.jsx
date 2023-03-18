import React, {useState, useEffect} from 'react'
import './Banner.css'
import { apiGet } from '../../utils/api/axios'
import { toast } from 'react-toastify'
import { images } from '../../constants'
import { Link } from 'react-router-dom';


const Banner = () => {
    const [category, setCategory] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await apiGet("categories");
          setCategory(res.data.data);
          console.log(res);
        } catch (error) {
          setError("Failed to fetch categories");
          toast.error(error.message);
        }
      };
      fetchCategories();
    }, []);
  
    return (
      <>
        <div>
          <div className="container">
            <ul>
              {category.map((cat) => (
                <li key={cat._id}>{cat.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1>Get Articles and papers on education</h1>
          <img src={images.hero1} alt="" />
        </div>
      </>
    );
  };
  
  

export default Banner