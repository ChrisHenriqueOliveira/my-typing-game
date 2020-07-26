import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    display: flex;
    font: 32px Roboto, sans-serif;
    font-weight: 700;
    color: #000;
  }
`;

export const PreviewArea = styled.div`
  display: flex;
  width: 100%;

  background: #fff;

  border-radius: 10px;
  border: 2px solid #838bc5;
  padding: 16px;
  margin-top: 16px;

  flex-wrap: wrap;

  span {
    color: #000;
    line-height: 24px;
    white-space: pre-wrap;
  }
`;

export const ProgressArea = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;

  .main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
      font: 24px Roboto, sans-serif;
      font-weight: 500;
      color: #000;
      margin: 0;
    }

    .buttons {
      width: 100%;
      max-width: 200px;
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        justify-content: space-between;
      }

      button,
      select {
        padding: 8px;
        height: 50px;
        width: 48%;

        color: #fff;
        background-color: #838bc5;
        border-radius: 10px;
        border: 0;
      }

      select {
        margin-top: 8px;
        width: 100%;
      }
    }
  }
`;

export const TypingArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  background: #fff;

  border-radius: 10px;
  border: 2px solid #838bc5;
  padding: 16px;
  margin-top: 16px;

  color: #000;
  line-height: 24px;
`;
