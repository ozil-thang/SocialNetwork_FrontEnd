import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { addPost } from '../../actions/post'
import { connect } from 'react-redux'

const PostForm = ({ addPost }) => {
    const [formData, setFormData] = useState({
        text: '',
        file: ''
    });

    const onChange = e => {
        if (e.target.type === 'file') {
            console.log(e.target)
            setFormData({ ...formData, file: e.target.files[0] })
        }
        else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

    }

    const onSubmit = e => {
        e.preventDefault();
        addPost(formData);
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={formData.text}
                    onChange={e => onChange(e)}
                ></textarea>
                <input type="file" onChange={e => onChange(e)} />
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
