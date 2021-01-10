import React, { Fragment, useState } from "react";
import { Modal, Button, Nav } from 'react-bootstrap';

const LogOutButton = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSignOut = () => { props.signOutCB(); handleClose() };
    return (
        <Fragment>
            <Nav.Link href="#" onClick={handleShow}>Cerrar Sesión</Nav.Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>seguro que quieres salir?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleSignOut}>
                        Salir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default LogOutButton;