import { styled } from '@mui/system';
import { TableRow, TableCell } from '@mui/material';

export const CustomTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  height: 70, // 셀 높이 설정 (예: 50px)
}));

export const tableHeaderStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  position: 'sticky',
  top: 0,
  zIndex: 1,
  minWidth: 120,
  width: 150,
});

export const tableCellStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  minWidth: 120,
  width: 150,
  height: 65,
});