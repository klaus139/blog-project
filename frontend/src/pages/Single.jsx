import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import moment from 'moment';

import DOMPurify from 'dompurify'
import { apiGet } from '../utils/api/axios';
import Menu from '../components/Menu';
import Comment from '../components/comment/Comment';

const Single = () => {
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);
    const [comments, setComments] = useState([])

    const location = useLocation();
    // const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const res = await apiGet(`post/${postId}`);
                setPost(res.data);
                const category = await apiGet(`categories`);
                setCategories(category.data.data);
                const comments = await apiGet(`comments`);
                setComments(comments.data.data)
                console.log(comments)

            }catch(error){
                console.log(error)
            }
        };
        fetchData();
    }, [postId]);

    const getText = (html) => {
        const doc = new  DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent;
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find((category) => category._id === categoryId);
        return category ? category.title : '';
      };

    const getComments = (commentId) => {
        const comment = comments.find((comment)=> comment._id === commentId);
        return comment ? comment.description : '';
    }

    return (
        <div className='single'>
            <div className='content'>
                <img src={post.image} alt={post.title} />
               <div className='info'>
                <span>{post.title}</span>
               
               <p>Posted{moment(post.date).fromNow()}</p>
               <p>Category: {getCategoryName(post.category)}</p>
               </div>
               <h1>{post.title}</h1>
               <p dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.body),
               }}
               ></p>
                <p>Category: {getCategoryName(post.category)}</p>
                <Comment postId={postId}/>
               <Menu cat={post.category} />

            </div>
        </div>
    )

}

export default Single