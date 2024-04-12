import LinkButton from '@/components/common/LinkButton'
import ArrowIcon from '@/public/images/arrow-out-icon.svg'
import { type BaseBlockEntry } from '@/components/Home/types'
import css from './styles.module.css'
import RichText from '@/components/common/RichText'
import { Box, Typography } from '@mui/material'
import { isEntryTypeExternalURL } from '@/lib/typeGuards'

// TODO: this component should replace src/components/common/LinkCard/index.tsx . Refactor to be done in a separate PR
const LinkCard = (props: BaseBlockEntry) => {
  const { caption, title, link } = props.fields

  return (
    <div className={`${css.card} ${css.outline}`}>
      <div className={css.cardHeader}>
        <Typography variant="caption">{caption}</Typography>
      </div>

      <div className={css.cardBody}>
        <Box mt="auto">
          <RichText {...title} />
        </Box>

        {link && isEntryTypeExternalURL(link) ? (
          <LinkButton href={link.fields.url} underline={false} fullSize />
        ) : undefined}
      </div>

      <ArrowIcon className={css.arrow} />
    </div>
  )
}

export default LinkCard
