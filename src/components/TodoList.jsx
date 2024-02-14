import { Fragment , useState} from "react";
import defaultTodos from "../constants/defaultTodos";
import "../index.css"

function TodoList() {

    let [ todos , setTodos ] = useState(defaultTodos)
    let [ inputValue , setInputValue ] = useState('')

    function handleInputValue(event){
        setInputValue(event.target.value)
    }

    function updateTodos() {
        setTodos([...todos , {id: Math.random() , name: inputValue , CheckboxFlag: false}])
        setInputValue('')
    }

    function toggleCheckboxFlag(id , CheckboxFlag){
        setTodos(todos.map((todo) => {
            if(todo.id === id){
                return {...todo , CheckboxFlag: !CheckboxFlag}
            }

            return todo
        }))
    }

    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }    

    function deleteSelected(){
        setTodos(todos.filter((todo) => {
            if(!todo.CheckboxFlag){
                return todo
            }
        }))
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
                    <button id="AddTodoBtn" onClick={updateTodos}>Add Todo</button>
                </div>
                <div className="TodosContainer">
                    {todos.map((todo) => {
                        return <div className="todo-item">
                            <input type="checkbox" className="IsDoneCheckbox" onChange={() => toggleCheckboxFlag(todo.id , todo.CheckboxFlag)}></input>
                            <div className="todo-text">{todo.name}</div>
                            <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>x</button>
                        </div>
                    })}
                    {todos.length ? <button id="deleteSelectedBtn" onClick={deleteSelected}>Delete Selected</button> : ''}
                </div>
                
            </div>
        </div>
    </>
}

export default TodoList