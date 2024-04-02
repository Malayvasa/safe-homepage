import Image from 'next/image'
import Tags from '@/components/Blog/Tags'
import { Box, Grid, Typography } from '@mui/material'
import css from './styles.module.css'
import blogCss from '../styles.module.css'
import { formatBlogDate } from '@/components/Blog/utils/formatBlogDate'
import { calculateReadingTimeInMin } from '@/components/Blog/utils/calculateReadingTime'
import { type BlogPostEntry } from '@/components/Blog/Post'
import { isAsset } from '@/lib/typeGuards'
import CategoryIcon from '@/public/images/Blog/category-icon.svg'
import { AppRoutes } from '@/config/routes'
import { containsTag, PRESS_RELEASE_TAG } from '@/lib/containsTag'
import NextLink from 'next/link'

const FeaturedPost = (props: BlogPostEntry) => {
  const { slug, coverImage, category, date, title, excerpt, tags, content } = props.fields

  const isPressRelease = containsTag(tags, PRESS_RELEASE_TAG)

  return (
    <Box mt={10}>
      {isPressRelease ? (
        <Typography variant="caption" className={css.tagline}>
          Latest Press Release
        </Typography>
      ) : null}
      <Grid container columnSpacing="60px" rowGap={3}>
        <Grid item md={7}>
          {isAsset(coverImage) && coverImage.fields.file?.url ? (
            <NextLink href={`/blog/${slug}`}>
              <Image
                src={coverImage.fields.file.url}
                alt={coverImage.fields.title ?? ''}
                width={coverImage.fields.file.details.image?.width}
                height={coverImage.fields.file.details.image?.height}
                className={css.image}
              />
            </NextLink>
          ) : undefined}
        </Grid>

        <Grid item md={5} className={css.body}>
          <div className={css.meta}>
            <div className={css.metaStart}>
              <Typography variant="h4" className={blogCss.category}>
                <CategoryIcon />
                {category}
              </Typography>
              <Typography variant="caption">{calculateReadingTimeInMin(content)}</Typography>
            </div>
            <Typography variant="caption">{formatBlogDate(date)}</Typography>
          </div>
          <Typography variant="h3" className={css.title}>
            <NextLink href={`${AppRoutes.blog.index}/${slug}`}>{title}</NextLink>
          </Typography>
          <Typography className={css.excerpt}>{excerpt}</Typography>

          <Box mt={2}>
            <Tags tags={tags} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FeaturedPost
