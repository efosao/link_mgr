import nanoid from 'nanoid'
import {
  Container,
  Grid,
  GridColumn,
  Header,
  Icon
} from 'semantic-ui-react'
import LinksForm from '../components/links_form'
import Share from '../components/share'
import { baseUrl } from '../lib_shared/constants'

const Page = ({ id }) => {
  return (
    <Grid>
      <GridColumn>
        <Container>
          <Header as='h2'>
            <Icon color='blue' name='linkify' />
            <Header.Content>
              Links Saver
              <Header.Subheader>By Efosa Oyegun</Header.Subheader>
            </Header.Content>
          </Header>
          <LinksForm id={id} />
          <Share id={id} />
        </Container>
      </GridColumn>
      <style jsx global>{`
        body {
          margin: 20px 0 0;
        }
      `}</style>
    </Grid>
  )
}

Page.getInitialProps = ({ query = {}, res }) => {
  const { id } = query
  if (id) return { id }

  // redirect user to page with unique id for semi-private lists
  const redirectUrl = `${baseUrl}/${nanoid()}`
  if (res) return res.redirect(redirectUrl)
  window.location = redirectUrl
}

export default Page
