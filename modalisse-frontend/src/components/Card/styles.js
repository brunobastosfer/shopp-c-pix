import styled from 'styled-components'

export const CardItems = styled.section`
  margin-top: 2.5rem;
  border: 1px solid white;
  box-shadow: 1px 1px 3px #888888;
  border-radius: 0.5rem;
  width: fit-content;
  max-width: 33.33%;
  height: fit-content;
  .cardItem__image__content {
  }
  .cardItem__description__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
      font-size: 1.5rem;
      margin-top: 20px;
    }
    > p {
      font-size: 1.3rem;
      color: blue;
      margin-top: 8px;
    }
    > button {
      margin: 16px 0px;
      background: #3b49df;
      color: var(--white);
      border: none;
      padding: 10px;
      border-radius: 4px;

      display: flex;
      > span {
        padding-right: 10px;
      }
    }
  }
`
