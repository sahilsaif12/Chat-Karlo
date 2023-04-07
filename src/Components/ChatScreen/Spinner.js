import React from 'react'

export const Spinner = () => {
  return (
    <div>
    <div class="spinner-border text-info" style={{"width": "3rem", "height": "3rem"}} role="status">
  <span class="sr-only">Loading...</span>
</div>
    </div>
  )
}
