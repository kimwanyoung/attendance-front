import {Button, Container, Dropdown, DropdownButton, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import CreateGroupModal from "../../groups/CreateGroupModal";
import CustomDropdownButton from "./CustomDropdownButton";
import SearchGroupModal from "./SearchGroupModal";
import searchGroupModal from "./SearchGroupModal";

const GlobalNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [createModalShow, setCreateModalShow] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);

    const handleClose = () => setCreateModalShow(false);
    const handleShow = () => setCreateModalShow(true);

    const handleSearchModal = () => {
        setSearchModalShow((prevState) => !prevState);
    }
    const isGroupPage = /^\/groups\/\d+$/.test(location.pathname);

    const handleNavigate = (url: string) => {
        navigate(`${location.pathname}/${url}`)
    }

    return (
        <>
            <Navbar className="d-flex justify-content-center align-items-center" style={{
                fontWeight: 400,
                fontStyle: "normal",
            }}>
                <Container className="w-100 d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/groups">
                        <img
                            src="/img/teamwork.png"
                            width={30}
                            height={30}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        Attendance
                    </Navbar.Brand>
                    { location.pathname === '/groups' &&
                        <DropdownButton
                            align="end"
                            variant="success"
                            title='그룹관리'
                            size="sm"
                        >
                            <Dropdown.Item onClick={handleShow}>그룹 생성</Dropdown.Item>
                            <Dropdown.Item onClick={handleSearchModal}>그룹 검색</Dropdown.Item>
                        </DropdownButton>

                    }
                    {
                        isGroupPage &&
                        <Button variant="success" onClick={() => handleNavigate('approval')} size="sm">가입 승인</Button>
                    }
                </Container>
            </Navbar>
            <CreateGroupModal show={createModalShow} onHide={handleClose}/>
            <SearchGroupModal show={searchModalShow} onHide={handleSearchModal}/>
        </>
    );
}

export default GlobalNavbar;