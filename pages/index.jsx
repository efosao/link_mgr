import {
  Container,
  Grid,
  Header,
  Icon,
  GridColumn
} from 'semantic-ui-react'

const Page = () => {
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
          <p>Etc ....</p>
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

export default Page
