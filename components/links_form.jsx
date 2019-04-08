import gql from 'graphql-tag'
import { useRef, useState } from 'react'
import { Mutation } from 'react-apollo'
import { Input } from 'semantic-ui-react'
import LinksList from './links_list'

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
    setUrl(value)
  }

  const clearUrlInput = () => {
    setUrl('')
    urlInputRef.current.inputRef.current.value = ''
  }

  return (
    <Mutation
      mutation={ADD_LINK}
      onCompleted={({ addLink }) => {
        console.log({ addLink })
        clearUrlInput()
      }}
      variables={{ id, url }}
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
