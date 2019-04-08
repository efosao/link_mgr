
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const allPostsQuery = gql`
  query getLinks ($id: String!) {
    getLinks (id: $id) {
      id
      url
    }
  }
`

const formatLinkBlocks = links => links.map(l => <li key={l.id}>{l.url}</li>)

const LinksList = ({ id }) => (
  <Query query={allPostsQuery} variables={{ id }}>
    {({ loading, error, data, fetchMore }) => {
      if (error) return <div>{JSON.stringify({ error })}</div>
      if (loading) return <div>Loading</div>
      const { getLinks } = data
      return (
        <ul>{formatLinkBlocks(getLinks)}</ul>
      )
    }}
  </Query>
)

export default LinksList
