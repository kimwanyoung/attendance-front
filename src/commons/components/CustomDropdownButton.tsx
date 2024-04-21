import {Dropdown, DropdownButton} from "react-bootstrap";

const CustomDropdownButton = () => {
    return (
        <DropdownButton
            align="end"
            variant="success"
            title='그룹관리'
            size="sm"
        >
            <Dropdown.Item>가입 승인</Dropdown.Item>
            <Dropdown.Item>공지 등록</Dropdown.Item>
        </DropdownButton>
    )
}

export default CustomDropdownButton;