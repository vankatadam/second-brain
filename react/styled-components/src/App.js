import React from 'react';
import TextAnimation from './components/TextAnimation';
import styled from "styled-components"


function App() {
  return (
    <Container>
      <h1>Welcome to the <TextAnimation text="Awesome"/> App</h1>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: auto;
  max-width: 500px;
  margin-top: 10rem;
`