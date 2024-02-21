import { Fragment , useReducer, useState} from "react";
import defaultTodos from "../constants/defaultTodos";
import "../index.css"
import ACTION_NAMES from "../constants/actionNames";

let { ADD_TODO , DELETE_TODO , DELETE_SELECTED_TODOS , MARK_AS_DONE} = ACTION_NAMES

function reducer (todos , action) {
    switch(action.type){
        case ADD_TODO: 
            return [...todos , {id: Math.random() , name: action.inputValue , CheckboxFlag: false}]
        case DELETE_TODO: 
            return todos.filter((todo) => todo.id !== action.id)
        case MARK_AS_DONE: 
            return todos.map((todo) => {
                if(todo.id === action.id){
                    return {...todo , CheckboxFlag: !action.CheckboxFlag}
                }
                return todo
            })
        case DELETE_SELECTED_TODOS: 
            return todos.filter((todo) => !todo.CheckboxFlag)
    }
}

function TodoList() {

    let [ todos , dispatch ] = useReducer(reducer , defaultTodos)
    let [ inputValue , setInputValue ] = useState('')

    function handleInputValue(event){
        setInputValue(event.target.value)
    }  

    function handleCheckBox(todo){
        dispatch({type: MARK_AS_DONE , id: todo.id , CheckboxFlag: todo.CheckboxFlag})
    }

    function deleteTodo(id){
        dispatch({type: DELETE_TODO , id})
    }   

    function deleteSelectedTodos(){
        dispatch({type: DELETE_SELECTED_TODOS})
    }

    function addTodo(){
        dispatch({type: ADD_TODO , inputValue})
        setInputValue('')
    }


    return <>
        <div className="Top"></div>
        
        <div className="Todo-List">
            <div className="Top-Of-TodoList">
                <div className="Top-Text">Todo List</div>
            </div>

            <div className="Bottom-Of-TodoList">
                <div id="inputBar">
                    <label htmlFor="AddTodoInput" id="LabelAddTodoInput">Add a new task</label><br />
                    <input id='AddTodoInput'type="text" value={inputValue} onChange={handleInputValue}/>
                    <button id="AddTodoBtn" onClick={addTodo}>Add Todo</button>
                </div>
                
                <div className="TodosContainer">
                    {todos.map((todo) => {
                        return <div className="todo-item" key={todo.id}>
                            <input type="checkbox" className="IsDoneCheckbox" onChange={() => handleCheckBox(todo)}></input>
                            <div className="todo-text">{todo.name}</div>
                            <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>x</button>
                        </div>
                    })}

                    {todos.length ? <button id="deleteSelectedBtn" onClick={deleteSelectedTodos}>Delete Selected</button> : ''}
                </div>
                
            </div>
        </div>
    </>
}

export default TodoList