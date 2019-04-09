import gql from 'graphql-tag'
import startsWith from 'lodash/startsWith'
import { useRef, useState } from 'react'
import { Mutation } from 'react-apollo'
import { Input } from 'semantic-ui-react'
import LinksList, { allLinksQuery } from './links_list'

const ADD_LINK = gql`
  mutation getLink ($id: String!, $url: String!) {
    addLink (id: $id, url: $url) {
      id
      url
    }
  }
`

const LinksForm = ({ id }) => {
  const [ url, setUrl ] = useState('')
  const urlInputRef = useRef()

  const handleUrlChange = e => {
    const value = e.currentTarget.value
    const formattedValue = startsWith(value, 'http') ? value : `http://${value}`
    setUrl(formattedValue)
  }

  const clearUrlInput = () => {
    setUrl('')
    urlInputRef.current.inputRef.current.value = ''
  }

  const allLinksQueryVars = { id }

  return (
    <Mutation
      mutation={ADD_LINK}
      onCompleted={({ addLink }) => {
        console.log({ addLink })
        clearUrlInput()
      }}
      variables={{ id, url }}
      update={(proxy, result) => {
        const { addLink } = result.data

        const data = proxy.readQuery({
          query: allLinksQuery,
          variables: allLinksQueryVars
        })

        const newQuery = {
          query: allLinksQuery,
          data: {
            ...data,
            allLinks: [addLink, ...data.allLinks]
          },
          variables: allLinksQueryVars
        }

        proxy.writeQuery(newQuery)
      }}
    >
      {(addLink, { data }) => {
        return (
          <div>
            <Input
              action={{
                content: 'Add URL',
                onClick: addLink
              }}
              onChange={handleUrlChange}
              pattern='https://.*'
              placeholder='https:// ...'
              type='url'
              ref={urlInputRef}
            />
            <LinksList id={id} />
          </div>
        )
      }}
    </Mutation>
  )
}

export default LinksForm
