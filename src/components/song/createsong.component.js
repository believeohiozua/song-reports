import React, { useState } from 'react';
import axios from 'axios';


function CreateSong(props) {
    const [songUpdate, setsongUpdate] = useState()
    const [inputField, setInputField] = useState({
        song: '',
        title: '',
        artist: '',
        description: '',
        photo: '',
        email: ''
    })
    const updateSong = (id) => {
        if (id && props.match.params.id) {
            axios.get(`http://127.0.0.1:5000/song/${props.match.params.id}`)
                .then(response => setInputField(response.data))
                .catch(response => console.log(response.data));
        }
    }
    const SubmsissionRemark = (res) => {
        if (res == 'Song added!') {
            var formsec = document.getElementById('form-sec');
            formsec.style.display = 'none';
            var add_more = document.getElementById('add-more');
            add_more.style.display = '';
            window.location = '/songs';

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { song, title, artist, description, photo, email } = inputField;
        const data = { song, title, artist, description, photo, email };
        console.log(data)
        axios.post('http://127.0.0.1:5000/song/add', data)
            .then(response => SubmsissionRemark(response.data))
            .catch(response => console.log(response.data));
    };

    const handleChange = name => e => {
        setInputField({ ...inputField, [name]: e.target.value });
    };
    const addMore = () => {
        setInputField({
            song: '',
            title: '',
            artist: '',
            description: '',
            photo: '',
            email: '',
        })
        var formsec = document.getElementById('form-sec');
        formsec.style.display = '';
        var add_more = document.getElementById('add-more');
        add_more.style.display = 'none';
    }
    var initialSize = 6
    var initialpad = 5
    if (props.size) {
        initialSize = props.size
        initialpad = props.pad
    }

    React.useEffect(() => updateSong(props.match), [])

    return (
        <div className={`col-md-${initialSize} mx-auto mt-lg-${initialpad} pt-lg-${initialpad} p-3`} id='mt_5'>

            <div id="form-sec">
                <h1 className="h3 text-center">Add New Song</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-floating mb-2">
                        <input name="song"
                            type="url"
                            className="form-control"
                            id="songinput"
                            placeholder="https;//wwww.example.com"
                            value={inputField.song}
                            required onChange={handleChange('song')}
                        />
                        <label htmlFor="songinput">Song</label>
                    </div>
                    <div className="row mb-2">
                        <div className="form-floating col-md-6">
                            <input name="title"
                                type="text"
                                className="form-control"
                                id="artistinput"
                                placeholder="John Doe"
                                value={inputField.title}
                                required onChange={handleChange('title')}
                            />
                            <label className="" htmlFor="artistinput">&ensp;Title</label>
                        </div>
                        <div className="form-floating col-md-6">
                            <input
                                name="artist"
                                type="text"
                                className="form-control"
                                id="artistinput"
                                placeholder="John Doe"
                                value={inputField.artist}
                                required onChange={handleChange('artist')} />
                            <label htmlFor="artistinput">&ensp;Artist</label>
                        </div>
                    </div>
                    <div className="form-floating mb-2">
                        <textarea name="description"
                            className="form-control"
                            placeholder="give a short decription"
                            id="description"
                            value={inputField.description}
                            style={{ height: '100px' }}
                            required onChange={handleChange('description')} />
                        <label htmlFor="description">Short Decription</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input name="photo" type="url"
                            className="form-control"
                            id="photoinput"
                            placeholder="https;//wwww.name@example.com"
                            value={inputField.photo}
                            required onChange={handleChange('photo')} />
                        <label htmlFor="photoinput">Photo</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input name="email"
                            type="email"
                            className="form-control"
                            id="emailinput"
                            placeholder="name@example.com"
                            value={inputField.email}
                            required onChange={handleChange('email')} />
                        <label htmlFor="emailinput">E-Mail</label>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-primary" type="submit">
                            Submit
                    </button>
                    </div>
                </form>
            </div>
            <div className="text-center py-3" id='add-more' style={{ display: 'none' }}>
                <p className='alert alert-success'> Song added successfully!</p>
                <button className="btn btn-success" onClick={addMore}>
                    add more
                </button>
            </div>
        </div >

    )
}

export default CreateSong;
