import React, { useState } from 'react'
import Form from '../../components/form'
import Foot from '../../components/foot'
import { TaskList } from '../../components/taskList'

export function Home() {
  const [status, setStatus] = useState('all')

  return (
    <div id="todoApp" className="todo-app">
      <Form />
      <TaskList status={status} />
      <Foot select={setStatus} currentStatus={status} />
    </div>
  )
}
