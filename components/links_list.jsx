
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const allPostsQuery = gql`
  query getLinks ($id: String!) {
    getLinks (id: $id)
  }
`
export const allPostsQueryVars = {
  id: 'abcdefg'
}

const LinksList = () => (
  <Query query={allPostsQuery} variables={allPostsQueryVars}>
    {({ loading, error, data, fetchMore }) => {
      if (error) return <div>{JSON.stringify({ error })}</div>
      if (loading) return <div>Loading</div>
      const { getLinks } = data
      return (
        <pre>{JSON.stringify({ getLinks }, null, 2)}</pre>
      )
    }}
  </Query>
)

export default LinksList
