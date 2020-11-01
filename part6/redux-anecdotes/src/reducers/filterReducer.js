const reducer = (state = '', { type, data }) => {
  switch (type){
    case 'FILTER':
      return new RegExp(data,'i')
    default:
      return ''
   }
 }
  
export const filter = search => {
  return {
    type: 'FILTER',
    data: search
  }
}

export default reducer