import {Button, Container, Navbar} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import CreateGroupModal from "../../groups/CreateGroupModal";
import CustomDropdownButton from "./CustomDropdownButton";

const GlobalNavbar = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isGroupPage = /^\/groups\/\d+$/.test(location.pathname);

    return (
        <>
            <Navbar className="bg-body-tertiary shadow-sm" style={{
                minWidth: "100%",
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
                    { location.pathname === '/groups' &&
                        <Button variant="success" onClick={handleShow}>그룹생성</Button>}
                    {
                        isGroupPage &&
                        <CustomDropdownButton />
                    }
                </Container>
            </Navbar>
            <CreateGroupModal show={show} onHide={handleClose}/>
        </>
    );
}

export default GlobalNavbar;