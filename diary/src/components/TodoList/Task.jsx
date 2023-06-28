import PropTypes from "prop-types";
import styled from "styled-components";

const TaskCont = styled.div``;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Task = (props) => {
  return (
    <div>
      <Center style={{ opacity: props.completed ? "30%" : "100%" }}>
        <Center>
          <div>edit button</div>
          <div>{props.taskName}</div>
        </Center>
        <Center>
          <button onClick={() => props.completeTask(props.id)}>
            <i className="fa fa-check circle"></i>
          </button>
          <button onClick={() => props.deletetask(props.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </Center>
      </Center>
    </div>
  );
};

Task.propTypes = {
  taskName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  completeTask: PropTypes.func.isRequired,
  deletetask: PropTypes.func.isRequired,
};

export default Task;
