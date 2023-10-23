import { render, screen } from '@testing-library/react';
import RenderAct from './RenderAct';


describe('throws act warning when rendering', () => {

  
  it('incorrect', async () => {

    render(<RenderAct/>);

   expect(await screen.findByText("img loaded")).toBeTruthy();

  }, );
});
