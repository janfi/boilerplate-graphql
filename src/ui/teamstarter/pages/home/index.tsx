import React, { useEffect, useState } from 'react'
import Form from '../../containers/form'
import Foot from '../../containers/foot'
import { TaskList } from '../../containers/taskList'

export function Home() {
  return (
    <div id="todoApp" className="todo-app">
      <Form />
      <TaskList />
      <Foot />
    </div>
  )
}
