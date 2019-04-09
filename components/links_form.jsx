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
    setUrl(formattedValue.trim())
  }

  const getUrlChangeHandler = addLink => {
    return e => {
      if (e.which === 13) addLink()
    }
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
        const handleAddLink = () => {
          // minor valdation
          const value = urlInputRef.current.inputRef.current.value.trim()
          if (value) addLink()
        }

        return (
          <div>
            <Input
              action={{
                content: 'Add URL',
                onClick: handleAddLink
              }}
              onChange={handleUrlChange}
              input={(
                <input
                  onKeyUp={getUrlChangeHandler(handleAddLink)}
                />
              )}
              pattern='https://.*'
              placeholder='https:// ...'
              type='url'
              ref={urlInputRef}
            />
            <LinksList id={id} />
            <style jsx>{`
              div {
                min-height: 70vh;
              }  
              
            `}</style>
          </div>
        )
      }}
    </Mutation>
  )
}

export default LinksForm
