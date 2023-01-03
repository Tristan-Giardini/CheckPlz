import styled from "styled-components";

const ModalComponent = ({ setIsModal, deleteUser }) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Body>
        <div>Delete account</div>
        <div>Are you sure you want to delete your account?</div>
        <ButtonDiv>
          <button onClick={deleteUser}>Yes, I'm sure</button>
          <button onClick={() => setIsModal(false)}>No, never mind</button>
        </ButtonDiv>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  height: 200px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default ModalComponent;
