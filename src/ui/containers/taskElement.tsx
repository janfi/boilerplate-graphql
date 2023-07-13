import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useDebouncedCallback } from 'use-debounce'

import { Task } from '../../models/task.model'
import {
  TOMOROW_DATE,
  getStringDate
} from '../../shared/tools/date/common-dates'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../services/task/update-task'
import { deleteTask } from '../../services/task/delete-task'

export default function TaskElement({ task }: { task: Task }) {
  const [reminder, setRemind] = useState(false)

  const { id, name, active, memoDate, memoSent } = task

  const dispatch = useDispatch()

  useEffect(() => {
    setRemind(task.memoDate !== null)
  }, [task])

  const taskUpdate = (task: {
    id: number
    name?: string
    active?: boolean
    memoDate?: string | null
    memoSent?: boolean
  }) => {
    dispatch(updateTask(task))
  }

  const taskDelete = (id: number) => {
    dispatch(deleteTask(id))
  }

  async function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    await taskUpdate({ id: id, active: !e.currentTarget.checked })
  }

  function handleDelete(e: MouseEvent<HTMLButtonElement>) {
    taskDelete(id)
  }

  async function handleMemo(value?: any) {
    let memoDate =
      value === ''
        ? null
        : value < TOMOROW_DATE
        ? TOMOROW_DATE
        : getStringDate(value)

    await taskUpdate({
      id,
      memoDate,
      memoSent: false
    })
  }

  function addReminder(value?: any) {
    setRemind(true)
  }

  const { callback: debouncedHandleUpdate }: any = useDebouncedCallback(
    (value: any) => {
      taskUpdate({ id: id, name: value })
    },
    1000
  )

  return (
    <li className="todo">
      <div className="pretty p-icon p-round">
        <input
          type="checkbox"
          className="checkbox"
          checked={!active}
          onChange={handleCheck}
        />
        <div className="state">
          <i className="icon mdi mdi-check mdi-18px"></i>
          <label></label>
        </div>
      </div>
      <input
        className={`todo-text ${!active && 'todo-checked-text'}`}
        onChange={e => debouncedHandleUpdate(e.currentTarget.value)}
        defaultValue={name}
      ></input>
      {memoDate || reminder ? (
        <input
          type="date"
          className={`${!!memoSent && active && 'memo-sent'}`}
          disabled={!active}
          onChange={e => handleMemo(e.currentTarget.value)}
          min={TOMOROW_DATE}
          value={memoDate ? memoDate.substring(0, 10) : ''}
        />
      ) : (
        <button
          disabled={!active}
          className={`memo-button ${!active && 'memo-hidden'}`}
          onClick={e => addReminder()}
        >
          reminder
        </button>
      )}

      <button className="delete-button" onClick={handleDelete}>
        ×
      </button>
    </li>
  )
}
