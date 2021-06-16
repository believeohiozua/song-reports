import React, { useState } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import FloatingLabel from "react-bootstrap-floating-label";

function CreateSong(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    var initialSize = 6
    var initialpad = 5
    if (props.size) {
        initialSize = props.size
        initialpad = props.pad
    }
    return (
        <div className={`col-md-${initialSize} mx-auto mt-lg-${initialpad} pt-lg-${initialpad} p-3`} id='mt_5'>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FloatingLabel controlId="songurl" label="Song" className="mb-3">
                    <Form.Control type="text" placeholder="Embeded link to song" required />
                </FloatingLabel>
                <FloatingLabel controlId="song-title" label="Title" className="mb-3">
                    <Form.Control type="text" placeholder="title of song" required />
                </FloatingLabel>
                <Row className="mb-3">
                    <FloatingLabel controlId="artist" label="Artist" className="mb-3">
                        <Form.Control type="text" placeholder="name of Artist" required />
                    </FloatingLabel>
                    <FloatingLabel controlId="decription" label="Short Decription" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a decription here"
                            style={{ height: '300px' }}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="image" label="Image" className="mb-3">
                        <Form.Control type="text" placeholder="Image" required />
                    </FloatingLabel>
                    <FloatingLabel controlId="email" label="E-Mail" className="mb-3">
                        <Form.Control type="email" placeholder="Enter email" required />
                    </FloatingLabel>
                </Row>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>

    )
}

export default CreateSong;
