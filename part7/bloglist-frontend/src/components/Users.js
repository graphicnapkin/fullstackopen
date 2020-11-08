import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/UsersReducer'


const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <Table striped>
      <thead>
        <tr>
          <td><b>User</b></td>
          <td><b>Blog Count</b></td>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td> {user.blogs.length}</td>
          </tr>)
        }
      </tbody>
    </Table>
  )
}

export default Users