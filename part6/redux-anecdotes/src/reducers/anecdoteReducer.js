import anecdoteService from '../services/anecdotes'

const reducer = (state = [], { type, data }) => {
  switch(type){
    case 'VOTE':
      let { id:item } = data
      return state.map(anecdote => {
        if(anecdote.id === item) return { ...anecdote, votes: anecdote.votes + 1 } 
        return anecdote
      })
    case 'NEW_ANECDOTE':
      let {content, id, votes} = data
      return state.concat({ content, id, votes})
    case 'INIT_NOTES':
      return data
    default:
      return state
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    await anecdoteService.voteFor(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
   
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.content,
        id: newAnecdote.id,
        votes: 0
      } 
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}
export default reducer