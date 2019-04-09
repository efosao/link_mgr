import get from 'lodash/get'
import { useRef } from 'react'
import { Input } from 'semantic-ui-react'
import { baseUrl } from '../lib_shared/constants'

const Share = ({ id }) => {
  if (!id) return null

  const inputRef = useRef()

  return (
    <div>
      <Input
        action={{
          color: 'teal',
          labelPosition: 'right',
          icon: 'copy',
          content: 'Copy',
          onClick: () => {
            const inputEl = get(inputRef, 'current.inputRef.current')
            if (inputEl) {
              inputEl.select()
              document.execCommand('copy')
            }
          }
        }}
        defaultValue={`${baseUrl}/${id}`}
        ref={inputRef}
      />
    </div>
  )
}

export default Share
