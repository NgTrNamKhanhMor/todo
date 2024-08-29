import { Box } from '@mui/material'
type ColoredBoxProps = {
  color: string,
}
export default function ColoredBox({color}: ColoredBoxProps) {
  return (
    <>
        <Box
            sx={{
                width: 24,
                height: 24,
                backgroundColor: color,
                borderRadius: '4px',
            }}
            />
    </>
  )
}
