import {Button, Container, Modal, Navbar, NavDropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import CreateGroupModal from "../../groups/CreateGroupModal";

const GlobalNavbar = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className="bg-body-tertiary" style={{
                minWidth: "100%", fontFamily: "Gamja Flower",
                fontWeight: 400,
                fontStyle: "normal",
            }}>
                <Container>
                    <Navbar.Brand href="/groups">
                        <img
                            src="/img/teamwork.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        Attendance
                    </Navbar.Brand>
                    <Button variant="success" onClick={handleShow}>그룹생성</Button>
                </Container>
            </Navbar>
            <CreateGroupModal show={show} onHide={handleClose}/>
        </>
    );
}

export default GlobalNavbar;