import nanoid from 'nanoid'
import {
  Container,
  Grid,
  GridColumn,
  Header,
  Icon
} from 'semantic-ui-react'
import LinksList from '../components/links_list'
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
          <p>ID: {id}</p>
          <LinksList />
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
