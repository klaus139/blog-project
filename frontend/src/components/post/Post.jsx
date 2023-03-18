import './Post.css'
import {Link} from 'react-router-dom'
function Post({post}) {
  const PF = "http://localhost:4000/images/"
  return (
    <div className='post'>
      {post.photo && (
        <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />  
      )}
      
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map(cat => (
            <span className="postCat" key={cat._id}>{cat.name}</span>
          ))} 
        </div>
        <Link to={`/post/${post._id}`}>
          <div className="postTitle">{post.title}</div>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className='postDesc'>
        {post.desc}
      </p>
    </div>
  )
}

export default Post