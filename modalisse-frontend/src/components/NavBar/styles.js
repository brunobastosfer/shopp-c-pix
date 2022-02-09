import styled from 'styled-components'

export const NavBarContainer = styled.header`
  background: var(--black);
  height: 5rem;

  color: white;

  position: sticky;
  top: 0;

  z-index: 9999;

  display: flex;

  .navBar__logo__content {
    display: flex;
    align-items: center;

    width: 60%;
  }

  .navBar__link__content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 40%;

    button {
      background: #3b49df;
      color: white;
      padding: 6px 16px;
      border: 1px solid white;
      border-radius: 2px;

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`
