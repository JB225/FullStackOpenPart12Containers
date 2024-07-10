const Todo = ({text, status}) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
          <span>
            {text}
          </span>
          {status}
        </div>
      )
}

export default Todo