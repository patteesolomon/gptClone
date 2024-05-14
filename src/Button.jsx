import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: #2196f3;
    color: white;
`;

const CustomButton = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default CustomButton;
