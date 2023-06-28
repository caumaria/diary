import PropTypes from 'prop-types';

const Task = ( props ) => {
  return (
    <div>
              <li
              style={{textDecoration: props.completed ? "line-through" : 'none'}}

              
              >{props.taskName}</li>
              <button onClick={() => props.completeTask(props.id)}>
                <i className="fa fa-check circle"></i>
              </button>
              <button onClick={() => props.deletetask(props.id)}>
                <i className="fa fa-trash"></i>
              </button>
              
    </div>
  )
}

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  completeTask: PropTypes.func.isRequired,
  deletetask: PropTypes.func.isRequired,
};

export default Task
