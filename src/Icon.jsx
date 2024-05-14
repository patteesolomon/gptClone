import React from 'react';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
    color: #f50057;
`;

const CustomIcon = ({ children, ...props }) => {
    return <StyledIconButton {...props}>{children}</StyledIconButton>;
};

export default CustomIcon;
