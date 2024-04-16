import LinkButton from '@/components/common/LinkButton'
import { Button } from '@mui/material'
import css from './styles.module.css'
import SafeLink from '@/components/common/SafeLink'
import { type Entry } from 'contentful'
import { type TypeButtonSkeleton } from '@/contentful/types'

type ButtonsWrapperProps = { buttons: Entry<TypeButtonSkeleton, undefined, string>[] }

const ButtonsWrapper = ({ buttons }: ButtonsWrapperProps) => {
  if (!buttons || buttons.length === 0) return null

  return (
    <div className={css.wrapper}>
      {buttons.map((button, index) => {
        const { text, href, variant } = button.fields
        const isButton = variant === 'button'

        return (
          <SafeLink key={index} href={href}>
            {isButton ? (
              <Button variant="contained" size="large">
                {text}
              </Button>
            ) : (
              <LinkButton>{text}</LinkButton>
            )}
          </SafeLink>
        )
      })}
    </div>
  )
}

export default ButtonsWrapper
