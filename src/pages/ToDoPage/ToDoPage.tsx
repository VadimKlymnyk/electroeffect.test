import React, { useState, useEffect } from 'react'
import { Button, Form } from 'antd';
import { getTodo, updateTodo, addTodo, searchTodo } from '../../api/request';
import {TodoList} from '../../components/ToDoList'
import {ModalToDo} from '../../components/ModalToDo'
import {forwardTo} from "../../utils/utils";
import {ITodo, formParams} from "../../utils/interfaces";


const emptyTodo:ITodo = {
    body: '',
    created_at: '',
    id: '',
    status: false,
    title: '',
    updated_at: '',
  }

export const ToDoPage: React.FC = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>(false)
    const [searchFlag, setSearchFlag] = useState<boolean>(false)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [selectedToDo, setSelectedToDo] = useState<ITodo | any>(emptyTodo)
    const [todos, setTodos] = useState<ITodo[]>([])

    const onLogout = () => {
        localStorage.removeItem('token');
        forwardTo('/login')
    }

    const getTodoRequest = async () =>{
        try {
            const response = await getTodo()
            if(response) setTodos(response.results)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    useEffect(() => {
        getTodoRequest()
    }, [])
    

    const onToggle = async (todo: any) => {
        const response = await updateTodo({
            id: todo.id,
            data: {
                title: todo.title,
                body: todo.body,
                status: !todo.status,
            }
        })
        if(response) {
            getTodoRequest()
        } 
    }

    const onAddTodo = () => {
        form.setFieldsValue(emptyTodo);
        setSelectedToDo(emptyTodo)
        setVisible(true)
    }

    const onChange = (id: string) => {
        const todo = todos.find(todo => todo.id === id)
        setSelectedToDo(todo)
        form.setFieldsValue(todo);
        setVisible(true)
    }
    
    const onFinish = async (value: formParams) => {
        if(selectedToDo.id){
            const response = await updateTodo({
                id: selectedToDo.id,
                data: value
            })
            if(response) {
                setVisible(false)
                getTodoRequest()
            }
        }else{
            const response = await addTodo(value)
            if(response) {
                setVisible(false)
                getTodoRequest()
            }
        }
    }

    const onSearch = async (text: string) => {
        if(text){
            setSearchLoading(true)
            const response = await searchTodo(text)
            if(response){
                setTodos(response.results)
                setSearchFlag(true)
                setSearchLoading(false)
            }
        }else if(!text && searchFlag){
            setSearchFlag(false)
            getTodoRequest()
        } 
    }

    return (
        <div className="main-todo">
            <header className="header">
                <h1>
                    React + Typescript
                </h1>
                <Button type="primary"  onClick={onLogout}  >
                    Logout
                </Button>
            </header>

            <TodoList
                todos={todos}
                searchLoading={searchLoading}
                onToggle={onToggle}
                onSearch={onSearch}
                onAddTodo={onAddTodo}
                onChange={onChange}
            />
            <ModalToDo
                form={form}
                visible={visible}
                setVisible={setVisible}
                onFinish={onFinish}
            />
        </div>
    )
}
