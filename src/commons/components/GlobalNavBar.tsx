import {Container, Navbar, NavDropdown} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const GlobalNavbar = () => {
    const location = useLocation();
    return (
        <Navbar className="bg-body-tertiary" style={{minWidth: "100%"}}>
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
                {
                    location.pathname !== '/' &&
                    <Navbar.Collapse id="basic-navbar-nav">
                    <NavDropdown title="그룹메뉴" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">그룹 생성</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            투표 현황
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    );
}

export default GlobalNavbar;