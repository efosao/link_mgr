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
  const [ filter, setFilter ] = useState('')
  const urlInputRef = useRef()
  const filterInputRef = useRef()

  const handleUrlChange = e => {
    const value = e.currentTarget.value
    const formattedValue = startsWith(value, 'http') ? value : `http://${value}`
    setUrl(formattedValue.trim())
  }

  const handleFilterChange = e => {
    const value = filterInputRef.current.inputRef.current.value
    setFilter(value)
  }

  const getUrlChangeHandler = addLink => {
    return e => {
      if (e.which === 13) addLink()
    }
  }

  const clearFilterInput = () => {
    setFilter('')
    filterInputRef.current.inputRef.current.value = ''
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
              input={(
                <input
                  onKeyUp={getUrlChangeHandler(handleAddLink)}
                />
              )}
              onChange={handleUrlChange}
              pattern='https://.*'
              placeholder='https:// ...'
              ref={urlInputRef}
              type='url'
            />

            <span className='input_filter'>
              <Input
                action={{
                  content: 'Clear filter',
                  onClick: clearFilterInput
                }}

                onChange={handleFilterChange}
                placeholder='filter'
                ref={filterInputRef}
              />
            </span>

            <LinksList filter={filter} id={id} />
            <style jsx>{`
              div {
                min-height: 70vh;
              }
              .input_filter {
                margin: 0 0 0 20px;
              }
              
            `}</style>
          </div>
        )
      }}
    </Mutation>
  )
}

export default LinksForm
