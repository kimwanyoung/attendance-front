import {Dropdown, DropdownButton} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const CustomDropdownButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(`${location.pathname}/${url}`)
    }

    return (
        <DropdownButton
            align="end"
            variant="success"
            title='그룹관리'
            size="sm"
        >
            <Dropdown.Item onClick={() => handleNavigate('approval')}>가입 승인</Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigate('notice')}>공지 등록</Dropdown.Item>
        </DropdownButton>
    )
}

export default CustomDropdownButton;