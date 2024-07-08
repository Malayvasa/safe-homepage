import { Box, Container, Typography } from '@mui/material'
import type { BaseBlock } from '@/components/Home/types'

const SeeMore = ({ title }: BaseBlock) => (
  <Container>
    <Box height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h1">{title}</Typography>
    </Box>
  </Container>
)

export default SeeMore