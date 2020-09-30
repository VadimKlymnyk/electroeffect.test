import React from 'react'
import { Button, Input, List, Checkbox } from 'antd';
import { ITodo } from '../utils/interfaces'

type TodoListProps = {
    todos: ITodo[]
    searchLoading: boolean
    onToggle(item: ITodo): void
    onSearch(text: string): void
    onAddTodo(): void
    onChange(id: string): void
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  searchLoading,
  onSearch,
  onAddTodo,
  onChange,
  onToggle
}) => {

  return (
    <div className="container">
        <div className="nav">
            <Input.Search
                placeholder="input search text"
                onSearch={value => onSearch(value)}
                loading={searchLoading}
                style={{ width: 200 }}
            />
            <Button type="primary" onClick={onAddTodo}  >
                Add ToDo
            </Button>
        </div>
        <List
            itemLayout="horizontal"
            dataSource={todos}
            renderItem={item => (
            <List.Item className="list" extra={
                <Button type="primary" ghost  onClick={() => onChange(item.id)}  >
                    Change ToDo
                </Button>
                
            }>
                <List.Item.Meta
                    avatar={<Checkbox checked={item.status} onChange={() => onToggle(item)}/>}
                    title={item.title}
                    description={item.body}
                    className="item"
                />
            </List.Item>
            )}
        />
    </div>
  )
}