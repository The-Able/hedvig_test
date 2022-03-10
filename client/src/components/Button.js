import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Button } from '@mui/material';

function LoadingButton({
  loading,
  children,
  disabled,
  variant,
  color,
  type,
  ...rest
}) {
  return (
    <Box display="inline-block" position="relative">
      <Button
        disabled={loading || disabled}
        color={color}
        variant={variant}
        type={type}
         {...rest}
      >
        {children}
      </Button>
      {loading && (
        <Box
          component={CircularProgress}
          position="absolute"
          top="50%"
          left="50%"
          mt="-12px"
          ml="-12px"
          size={24}
        />
      )}
    </Box>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string
};

LoadingButton.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

export default LoadingButton;
