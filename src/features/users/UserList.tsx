import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUserList } from '../../app/users/selector'

const UsersList: React.FC = () => {
  const userList = useAppSelector(selectUserList)
  return (
    <div>
      {userList &&
        userList.map((user) => {
          return (
            <div key={user.id}>
              <hr />
              <h2>{`@${user.username}`}</h2>
              <ul>
                <li>{`name: ${user.name}`}</li>
                <li>{`email: ${user.email}`}</li>
                <li>{`phone: ${user.phone}`}</li>
                <li>{`website: ${user.website}`}</li>
              </ul>
              <Link as={`/users/${user.id}`} href="/users/[userId]">
                <button>View</button>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default UsersList
