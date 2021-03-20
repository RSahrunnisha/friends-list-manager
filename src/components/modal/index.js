import "./styles.scss";

const Modal = (props) => {
  const { isVisible = false, setIsVisible, onSuccessHandler } = props;
  return (
    <>
      {isVisible && (
        <div className="modal">
          <div className="modal_body">
            <h3>Are you sure about deleting this friend?</h3>
            <div className="modal_body_actions">
              <button
                className="close"
                onClick={() => setIsVisible(!isVisible)}
              >
                Close
              </button>
              <button
                className="actions-success"
                onClick={onSuccessHandler}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
