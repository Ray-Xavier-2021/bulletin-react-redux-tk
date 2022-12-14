import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../postsSlice'
// import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../../users/usersSlice'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()

    // Set users selector
    const users = useSelector(selectAllUsers)

    // Event handlers
    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    // Set user option to map each user and set user name w/ user.id as value
    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}>
                {user.name}
        </option>
    ))

    // Save post function
    const savePost = () => {
        if (title && content) {
            dispatch(
                addPost(title, content, userId)
            )

            setTitle('')
            setContent('')
            setUserId('')
        }
    }

    // Create a can save variable that checks if form is filled in ad holds the data to allow save button functionality if true and disable if false
    const canSavePost = Boolean(title) && Boolean(userId) && Boolean(content)

    return (
        <section>
            <h2>Add a New Post</h2>
            <form >
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select 
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChange}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={onContentChange}
                ></textarea>
                <button
                    type='button'
                    onClick={savePost}
                    disabled={!canSavePost}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm