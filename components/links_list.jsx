
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const allLinksQuery = gql`
  query allLinks ($id: String!) {
    allLinks (id: $id) {
      id
      url
    }
  }
`

const formatLinkBlocks = links => (
  <ul>
    {links.map(l => (
      <li key={l.id}>
        <a href={l.url} target='_blank'>{l.url}</a>
      </li>
    ))}
    <style jsx>{`
      ul {
        list-style-type: none;
        margin: 10px 0 0 0;
        padding: 0;
        width: 400px;
      }
      ul > li {
        color: #333;
        display: block;
        padding: 5px;
      }
    `}</style>
  </ul>
)

const LinksList = ({ id }) => (
  <Query query={allLinksQuery} variables={{ id }}>
    {({ loading, error, data }) => {
      if (error) return <div>{JSON.stringify({ error })}</div>
      if (loading) return <div>Loading</div>
      const { allLinks } = data
      return formatLinkBlocks(allLinks)
    }}
  </Query>
)

export default LinksList
