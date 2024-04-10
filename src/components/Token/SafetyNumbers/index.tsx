import RichText from '@/components/common/RichText'
import { type BaseBlockEntry } from '@/components/Home/types'
import { Container, Grid, Typography } from '@mui/material'
import layoutCss from '@/components/common/styles.module.css'
import Marquee from '@/components/Pressroom/Marquee'

const SafetyNumbers = (props: BaseBlockEntry) => {
  const { title, text } = props.fields

  return (
    <>
      <Container className={layoutCss.containerMedium}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <RichText {...title} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography mb={3}>{text}</Typography>
          </Grid>
        </Grid>
      </Container>

      {/* 
        total transactions
        safe accounts deployed
        fundraised
        value stored
      */}
      <Marquee items={[]} />
    </>
  )
}

export default SafetyNumbers
